import React,{Fragment,useEffect} from 'react'
import "./Orderdetail.css";
import {useSelector,useDispatch} from "react-redux";
import MetaData from '../layout/MetaData';
import { Link,useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import Loader from '../layout/Loader/Loader';
import { useAlert } from 'react-alert';
import { getorderdetail, clearerror } from '../../action/orderaction';


const Orderdetail = () => {
    const {loading,error,orderdetail}=useSelector((state)=>state.orderdetailred);
    const dispatch=useDispatch()
    const alert=useAlert()
    const {id}=useParams();
    useEffect(()=>{

        if(error){
            alert.error(error);
            dispatch(clearerror())
        }
        dispatch(getorderdetail(id))
    },[dispatch,id,alert,error])

  return (
    <Fragment>
        {loading?(<Loader/>):(
            <Fragment>
                <MetaData title="Order Details"/>
                <div className="orderDetailsPage">
                    <div className="orderDetailsContainer">
                        <Typography><h1>Order #{orderdetail && orderdetail._id}</h1></Typography>
                        <Typography>
                        Shipping Info
                        
                        </Typography>
                        <div className="orderDetailsContainerBox">
                            <div>
                                <p>Name:</p>
                                <span>{orderdetail.user && orderdetail.user.name}</span>
                            </div>
                            <div>
                                <p>Phone:</p>
                                <span>
                                    {orderdetail.shippinginfo && orderdetail.shippinginfo.phoneno}
                                </span>
                            </div>
                            <div>
                                <p>Address:</p>
                                <span>
                                    {orderdetail.shippinginfo &&
                                    `${orderdetail.shippinginfo.address},${orderdetail.shippinginfo.city},${orderdetail.shippinginfo.state},${orderdetail.shippinginfo.pincode},${orderdetail.shippinginfo.country}`
                                    }
                                </span>
                            </div>
                        </div>
                        <Typography>Payment</Typography>
                        <div className="orderDetailscontainerBox">
                            <div>
                                <p
                                className={
                                    orderdetail.paymentinfo &&
                                    orderdetail.paymentinfo.status==="succeeded"?"greenColor":"redColor" 
                                }
                                >
                                    {orderdetail.paymentinfo && 
                                    orderdetail.paymentinfo.status==="succeeded"?"PAID":"NOT PAID"}
                                </p>
                            </div>
                            <div>
                                <p>Amount:</p>
                                <span>{orderdetail.totalprice && orderdetail.totalprice}</span>
                            </div>
                        </div>
                        <Typography>Status</Typography>
                        <div className="orderDetailsContainerBox">
                            <div>
                                <p
                                className={
                                    orderdetail.orderstatus && orderdetail.orderstatus==="Delivered"?"greenColor":"redColor"
                                }
                                >
                                    {orderdetail.orderstatus && orderdetail.orderstatus}

                                </p>
                            </div>
                        </div>
                        </div>
                        <div className="orderDetailsCartItems">
                            <Typography> Order Items</Typography>
                            <div className="orderDetailsCartItemsContainer">{
                                orderdetail.orderitem && orderdetail.orderitem.map((item)=>(
                                    <div key={item.product}><img src={item.image} alt="Product" />
                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    <span>{item.quantity}X ${item.price}={""}
                                    <b>${item.price*item.quantity}</b>
                                    </span>
                                    </div>
                                ))
                            }</div>
                        </div>
                </div>
            </Fragment>
        )}
    </Fragment>
  )
}

export default Orderdetail