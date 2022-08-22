/* eslint-disable array-callback-return */
import {orderMayMen, orderMenMay} from './utils';

const {
    GET_ALL_PRODUCTS,
    GET_PRODUCT_BY_ID,
    UPDATE_PRODUCT,
    ORDEN_NAME,
    GET_INSTRUMENT_BY_NAME
} = require('../actions/index');

const initialState = {
    instruments: [],
    allInstruments: [],
    favoriteInstruments: [],
    retrievedInstrument: null
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                allInstruments: action.payload,
                instruments: action.payload,
            }

        case GET_PRODUCT_BY_ID:
            return {
                ...state,
                retrievedInstrument: action.payload
            }

        case UPDATE_PRODUCT:
            const allInstrumentsUpdated = state.allInstruments.map(item =>
                item._id === action.payload._id ? action.payload : item);

            const instrumentsUpdated = state.instruments.map(item =>
                item._id === action.payload._id ? action.payload : item);

            return {
                ...state,
                allInstruments: allInstrumentsUpdated,
                instruments: instrumentsUpdated,
                retrievedInstrument: action.payload
            }

        case 'CREATE_PRODUCT':
            return {
                ...state,
                allInstruments: [action.payload, ...state.allInstruments]
            }
        case ORDEN_NAME:
            let instrumentByOrd;
            if (action.payload === 'NA') {
                instrumentByOrd = state.allIstruments.map(instrument => {
                    let inst
                    state.instruments.map(ins => {
                        if (instrument.name === ins.name) inst = ins
                    })
                    return inst
                })
            } else if (action.payload === 'NDU') {
                instrumentByOrd = orderMayMen(state.instruments, 'name')
            } else {
                instrumentByOrd = orderMenMay(state.instruments, 'name')
            }
            return {
                ...state,
                instruments: [...instrumentByOrd.flat(2)]
            }
            case GET_INSTRUMENT_BY_NAME: 
            return {
                ...state,
                instruments: state.allInstruments.filter(instrument =>
                    instrument.name.toLowerCase().includes(action.payload.toLowerCase()))
            }

        default:
            return state
    }
}
