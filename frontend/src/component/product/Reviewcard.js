
import React from 'react'
// import ReactStars from 'react-rating-stars-component';
import profilepng from "../../images/profilepng.png"
import { Rating } from '@mui/material';

const Reviewcard = ({review}) => {
    const options={
      size:"large",
      value:review.rating,
      readOnly:true,
      precision:0.5,
        // edit:false,
        // color:"rgba(20,20,20,0.1)",
        // activeColor:"tomato",
        // size:window.innerWidth<600?15:20,
        // value:review.rating,
        // isHalf:true,
    };
  return (
    <div className='reviewCard'>
        <img src={profilepng} alt="user" />
        <p>{review.name}</p>
        <Rating {...options}/>
        <span className='reviewCardComment'>{review.comment}</span>
    </div>
    
  )
}

export default Reviewcard