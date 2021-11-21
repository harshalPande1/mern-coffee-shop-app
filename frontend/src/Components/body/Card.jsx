/** @format */

import React ,{useState} from "react";
import {useDispatch} from 'react-redux';
import {fetchSingleProduct} from '../../actions/action'
import './card.css';
function Card({imgSrc ,title , type  ,price ,productID}) {
  const [qty,setQty] = useState(1)
  const dispatch = useDispatch();
  const AddToCArt = () =>{
    dispatch(fetchSingleProduct(productID ,qty));
  }
  return (
    <div className='card mt-5 m-3' style={{width: "18rem"}}>
      <img className='card-img-top' src={imgSrc} alt='coffee'  />
      <div className='card-body'>
        <h4 className='card-title'>{ title ? title.substring(0,25) : null} </h4>
        <p className='card-text'>Price {price}Rs</p>
        <span className='qtyInput'> <button onClick={e=>setQty(qty===0?qty:qty-1)}>-</button> <input type="select"  value={qty} onChange={e=>setQty(e.target.value)}/> <button onClick={()=>setQty(qty===10?qty:qty+1)}>+</button></span>
       
        <button className='btn btn-dark' onClick={AddToCArt}>add</button>
    
      </div>
    </div>
  );
}

export default Card;
