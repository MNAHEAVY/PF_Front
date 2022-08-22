/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "../Pagination";
import Loading from "../Loading";
import Filters from "../../components/Filters/Filters";
import ProductCard from '../Card/index';
import Dropdown from 'react-bootstrap/Dropdown';
import './CardContainer.css';
import { orderPerName } from "../../redux/actions";

export default function CardContainer() {
    
    const allInstruments = useSelector(state => state.instruments)
    // const cargo = useSelector(state => state.allInstruments)
    const [currentPage, setCurrentPage] = useState(1)
    // const [order, setOrder] = useState({})
    const dispatch = useDispatch();
    const [refresh, setRefresh] = useState(1)

    useEffect(() => {
        setCurrentPage(1)
    }, [allInstruments])

    useEffect(() => {
        window.scrollTo({ behavior: 'smooth', top: '0px' });
    }, [currentPage]);

    // useEffect(() => {
    //     if (cargo && cargo.length > 0) {
    //         dispatch(orderby(order))
    //     }
    // }, [order, cargo])

    let idxLastItem = currentPage * 15
    let ixdFirstItem = idxLastItem - 15
    let pageInstruments = allInstruments.slice(ixdFirstItem, idxLastItem)

    let mapInstruments = pageInstruments.map(instrument => <ProductCard
        key={instrument._id}
        id={instrument._id}
        name={instrument.name}
        price={instrument.price}
        brand={instrument.brand}
        rating={1}
        image={instrument.image} />)

    const paginate = (number) => { setCurrentPage(number) }

    function handleOrder(e){
        e.preventDefault();
        setRefresh(refresh + 1)
        dispatch(orderPerName(e.target.value))
    }

    return (
        <div className="containerHome">
            <Dropdown className="orderButton" size="sm">
                <Dropdown.Toggle variant="success" className="toglleDropDown" id="dropdown-basic">
                    Order By
                </Dropdown.Toggle>

                <Dropdown.Menu onClick={handleOrder}>
                    <Dropdown.Item name="NUD">Name - Up to down</Dropdown.Item>
                    <Dropdown.Item name="NDU" >Name - Down to up</Dropdown.Item>
                    <Dropdown.Item name="NA" >Name - Any</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item name="PUD" >Price - Up to down</Dropdown.Item>
                    <Dropdown.Item name="PDU" >Price - Down to up</Dropdown.Item>
                    <Dropdown.Item name="PA" >Price - Any</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            {mapInstruments ?
                <div className="containerContent">
                    <Filters />
                    <div className="containerCards">
                        {mapInstruments}
                    </div>
                </div>
                : <Loading />}

            <Pagination currentPage={currentPage} postPerPage={15} totalPosts={allInstruments.length} paginate={paginate} />
        </div>
    )
}
