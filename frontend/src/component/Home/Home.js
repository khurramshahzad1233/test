import React,{ Fragment,useEffect} from 'react';
import ProductCard from "../product/ProductCard";
import MetaData from '../layout/MetaData';
import {clearerror, getproduct} from "../../action/productaction.js";
import {useSelector, useDispatch} from "react-redux";

import "./Home.css";
import Loader from '../layout/Loader/Loader.js';
import { useAlert } from 'react-alert';




const Home = () => {
  const alert=useAlert();
  const dispatch=useDispatch();
  const {products,loading,error}=useSelector((State)=>State.productred)

  useEffect(()=>{
    if(error){
      alert.error(error);
      dispatch(clearerror())
    }
   

    dispatch(getproduct())
  },[dispatch, error,alert]);
  return (
    <Fragment>
      {loading?(<Loader/>):(<Fragment>
       <MetaData title="Home Page"/> 

      <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>FIND AMAZING PRODUCT BELOW</h1>

        <a href="#container">
          <button>Scroll 
           
          </button>
        </a>


        
      </div>
      <h2 className="homeHeading">Featured Products</h2>
      <div className="container" id="container">
       {products && products.map((product)=><ProductCard product={product}/>)};
       
      </div>

    </Fragment>)}
    </Fragment>
  
    

  )
}

export default Home