
import React,{Fragment, useEffect,useState} from 'react'
import Carousel from "react-material-ui-carousel";
import {useDispatch, useSelector} from "react-redux";
import { clearerror, getproductdetail, newreview } from '../../action/productaction.js';
import { useParams } from 'react-router-dom';
import "./Productdetail.css"
// import ReactStars from 'react-rating-stars-component';
import Reviewcard from './Reviewcard.js';
import Loader from '../layout/Loader/Loader.js';
import {useAlert} from "react-alert"
import MetaData from '../layout/MetaData.js';
import {additemtocart} from "../../action/cartaction.js";

import {Dialog,DialogActions,DialogContent,DialogTitle,Button} from "@material-ui/core"
import { Rating } from '@mui/material';



const Productdetail = () => {
    
    const{id}=useParams();
    const dispatch=useDispatch();
    const alert=useAlert()
    const {product,loading,error}=useSelector((state)=>state.productdetail);
    const {success,error:reviewerror}=useSelector((state)=>state.newreviewred);
    

  
    
    
   

    const [quantity,setQuantity]=useState(1);
    const [open, setOpen]=useState(false);
    const [rating,setRating]=useState(0);
    const [comment,setComment]=useState("")

    const increasequantity=()=>{
      if(product.stock<=quantity)return;
      const qty=quantity+1;
      setQuantity(qty)
    };

    const decreasequantity=()=>{
      if(quantity<=1){return}
      const qty=quantity-1;
      setQuantity(qty)
    };


    const addToCartHandler=()=>{
      dispatch(additemtocart(id,quantity));
      alert.success("Item Added To Cart");
    };


    const submitReviewToggle=()=>{
      open?setOpen(false):setOpen(true);
    };

    const reviewSubmitHandler=()=>{
      const myForm=new FormData();

      myForm.set("rating",rating);
      myForm.set("comment",comment);
      myForm.set("productid",id);

      dispatch(newreview(myForm));
      setOpen(false)
    }


    useEffect(()=>{
      if(error){
        alert.error(error);
        dispatch(clearerror())
      }

      if(reviewerror){
        alert.error(reviewerror);
        dispatch(clearerror());
      }

      if(success){
        alert.success("Review Submitted Successfully");
        dispatch({type:"NEW_REVIEW_RESET"})
      }
        
        dispatch(getproductdetail(id));
      },[dispatch,id,alert,error,reviewerror,success]);

      
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
      {loading?(<Loader/>):(
        <Fragment>
          <MetaData title={`${product.name} --ECOMMERCE`}/>
       
        <div className="productdetail">
            <div className='carouseldev'>
            <Carousel className='carousel'>
                {product.image && 

                 product.image.map((item,i)=>(
                    <img className='CarouselImage' key={item.url} src={item.url} alt={`${i} Slide` } />
                ))}
            </Carousel>
        </div>
        <div className='detailblock'>
        <div className="detailblock-1">f
          <h2>{product.name}</h2>
          <p>Product # {product._id}</p>
        </div>
        <div className="detailblock-2">
          <Rating {...options}/>
          <span>({product.numofreview} Reviews)</span>
        </div>
        <div className="detailblock-3">
          <h2>{`$ ${product.price}`}</h2>
          <div className="detailblock-3-1">
            <div className="detailblock-3-1-1">
              <button onClick={decreasequantity}>-</button>
              <input readOnly type="number" value={quantity}/>
              <button onClick={increasequantity}>+</button>
            </div>
            <button disabled={product.stock<1?true:false} onClick={addToCartHandler}>Add to Card</button>
          </div>
          <p>
            status:
            <b className={product.stock<1?"redcolor":"greencolor"}>
              {product.stock<1?"outofstock":"instock"}
            </b>
          </p>
        </div>
        <div className="detailblock-4">
          Description: <p>{product.description}</p>
        </div>
        <button onClick={submitReviewToggle} className='submitreview'>Submit Review</button>
        </div>
        </div>

        <h3 className='reviewsHeading'>REVIEWS</h3>

        <Dialog
          aria-labelledby="simple-dialog-title"
          open={open}
          onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className='submitDialog'><Rating
            onChange={(e)=>setRating(e.target.value)}
            value={rating}
            size="large"
            />
            <textarea className="submitDialogTextArea"
            cols="30"
            rows="5"
            value={comment}
            onChange={(e)=>setComment(e.target.value)}
            ></textarea>
            </DialogContent>
            <DialogActions>
            <Button onClick={submitReviewToggle} color="secondary">Cancel</Button>
            <Button onClick={reviewSubmitHandler} color="primary"> Submit</Button>
            </DialogActions>

        </Dialog>




      {product.reviews && product.reviews[0]?(
          <div className="reviews">
           { product.reviews.map((review)=> <Reviewcard review={review} />)}
          </div>
        ):(
          <p className='noReviews'>NO REVIEWS YET</p>
        )}
    </Fragment>
      )}
    </Fragment>
  
      
  )
}

export default Productdetail