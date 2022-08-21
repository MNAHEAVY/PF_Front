import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import './CardContainer.css';
import Pagination from "../Pagination";
import Loading from "../Loading";
import Filters from "../../components/Filters/Filters";
import ProductCard from '../Card/index';
import {getAllProducts} from "../../redux/actions";

export default function CardContainer() {

  const dispatch = useDispatch();
  const allInstruments = useSelector((state) => state.allInstruments)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    if (allInstruments.length === 0) {
      dispatch(getAllProducts());
    }
  }, [dispatch, allInstruments]);
  
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

  return (
    <div className="containerHome">
      <Pagination currentPage={currentPage} postPerPage={15} totalPosts={allInstruments.length} paginate={paginate} />

      {mapInstruments ? 
        <div className="containerContent">
          <Filters/>
          <div className="containerCards">
            {mapInstruments}
          </div>
        </div> 
      : <Loading />}

      <Pagination currentPage={currentPage} postPerPage={15} totalPosts={allInstruments.length} paginate={paginate} />
    </div>
  )
}