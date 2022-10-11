import React, { Fragment, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Checkoutsteps from "./Checkoutsteps";
import MetaData from "../layout/MetaData";
import { Typography } from "@mui/material";
import { useAlert } from "react-alert";
import {
  CardExpiryElement,
  CardCvcElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import "./Payment.css";
import {CreditCard,Event,VpnKey} from "@mui/icons-material"
import {createorder,clearerror} from "../../action/orderaction.js";
import { useNavigate } from "react-router-dom";



const Payment = () => {
    const orderInfo=JSON.parse(sessionStorage.getItem("orderInfo"));
    const dispatch=useDispatch();
    const alert=useAlert();
    const stripe=useStripe();
    const elements=useElements();
    const payBtn=useRef(null);
    const navigate=useNavigate();
    let total=orderInfo.totalPrice.toFixed(2)
    const {shippingInfo, cartItems}=useSelector((state)=>state.cartred);
    const {user}= useSelector((state)=>state.userred);
    const {error}=useSelector((state)=>state.neworderred);

    const paymentData={
        amount:Math.round(total*100)
    };
    const order={
        shippinginfo:shippingInfo,
        orderitem:cartItems,
        
        itemprice:orderInfo.subtotal,
        taxprice:orderInfo.tax,
        shippingprice:orderInfo.shippingCharges,
        totalprice:orderInfo.totalPrice

    };
    const submitHandler = async (e) => {
        e.preventDefault();
    
        payBtn.current.disabled = true;
    
        try {
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
          const { data } = await axios.post(
            "/api/payment/process",
            paymentData,
            config
          );
    
        
          const client_secret = data.client_secret;
    
          if (!stripe || !elements) return;
    
          const result = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
              card: elements.getElement(CardNumberElement),
              billing_details: {
                name: user.name,
                email: user.email,
                address: {
                  line1: shippingInfo.address,
                  city: shippingInfo.city,
                  state: shippingInfo.state,
                  postal_code: shippingInfo.pincode,
                  country: shippingInfo.country,
                  // phone_no:shippingInfo.phoneno
                },
              },
            },
          });
    
          if (result.error) {
            payBtn.current.disabled = false;
    
            alert.error(result.error.message);
          } else {
            if (result.paymentIntent.status === "succeeded") {
              order.paymentinfo = {
                id: result.paymentIntent.id,
                status: result.paymentIntent.status,
              };
    
              dispatch(createorder(order));
    
              navigate("/success");
            } else {
              alert.error("There's some issue while processing payment ");
            }
          }
        } catch (error) {
          payBtn.current.disabled = false;
          alert.error(error.response.data.message);
        }
      };
    
      useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch(clearerror());
        }
      }, [dispatch, error, alert]);

    
        
    
  return (
    <Fragment>
        <MetaData title="Payment" />
      <Checkoutsteps activestep={2} />
      <div className="paymentContainer">
        <form className="paymentForm"  onSubmit={(e)=>submitHandler(e)}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCard />
            <CardNumberElement className="paymentInput" />
            
          </div>
          <div>
            <Event />
            <CardExpiryElement className="paymentInput" />
            
          </div>
          <div>
            <VpnKey />
            <CardCvcElement className="paymentInput" />
           
          </div>

          <input
            type="submit"
            value={`Pay = $ ${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </Fragment>
  )
}

export default Payment





