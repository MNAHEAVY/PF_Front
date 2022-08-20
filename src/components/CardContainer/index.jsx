import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import './CardContainer.css';
import Pagination from "../Pagination";
import Loading from "../Loading";
import Filters from "../../components/Filters/Filters";
import ProductCard from '../Card/index';
import { allInstruments } from "../../primer mock";

export default function CardContainer() {
  
  //const allInstruments = useSelector(state => state.instruments)
  const [currentPage, setCurrentPage] = useState(1)

  // useEffect(() => {
  //   setCurrentPage(1)
  // }, [allInstruments])
  
  let idxLastItem = currentPage * 15
  let ixdFirstItem = idxLastItem - 15
  let pageInstruments = allInstruments.slice(ixdFirstItem, idxLastItem)

  let mapInstruments = pageInstruments.map(instrument => <ProductCard
    key={instrument.id}
    id={instrument.id}
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