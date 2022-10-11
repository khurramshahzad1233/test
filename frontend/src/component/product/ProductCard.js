import {React, Fragment} from 'react';
import { Link } from 'react-router-dom';

// import ReactStars from 'react-rating-stars-component';
import { Rating } from '@mui/material';





const ProductCard = ({product}) => {
  const options={
    size:"large",
    value:product.ratings,
    readOnly:true,
    precision:0.5,
    // edit:false,
    // color:"rgba(20,20,20,0.1)",
    // activeColor:"tomato",
    // size:window.innerWidth<600?15:20,
    // value:product.ratings,
    // isHalf:true,
};
  return (
   <Fragment>
   <Link className='productcard' to={`/product/${product._id}`}>
    <img src={product.image[0].url} alt={product.name}/>
    <p>{product.description}</p>

    <div>
        <Rating {...options}/><span>({product.numofreview} Review)</span>
    </div>
    <div><span>{`$ ${product.price}`}</span></div>

   </Link>
   </Fragment>
  )
}

export default ProductCard;