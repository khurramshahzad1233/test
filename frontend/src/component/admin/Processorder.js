import React,{Fragment,useState,useEffect} from 'react'
import MetaData from "../layout/MetaData.js"
import {Link,useNavigate,useParams} from "react-router-dom"
import {Typography} from "@material-ui/core"
import Sidebar from "./Sidebar.js"
import {useSelector,useDispatch} from "react-redux"
import {useAlert} from "react-alert"
import { Button } from '@mui/material'
import "./Processorder.css"
import { AccountTree } from '@mui/icons-material'
import { getorderdetail, updateorder,clearerror } from '../../action/orderaction.js';
import Loader from "../layout/Loader/Loader"


export const Processorder = () => {
    const navigate=useNavigate();

    const{id}=useParams();
    const {loading,error,orderdetail}=useSelector((state)=>state.orderdetailred);
    const {error:updateError, isUpdated}=useSelector((state)=>state.updateorderred);

    const updateOrderSubmitHandler=(e)=>{
        e.preventDefault();

        const myForm=new FormData();
        myForm.set("status",status);
        dispatch(updateorder(id,myForm));

    };
    const dispatch=useDispatch();
    const alert=useAlert();
    const[status,setStatus]=useState("");

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearerror());
        }
        if(updateError){
            alert.error(updateError);
            dispatch(clearerror());
        }
        if(isUpdated){
            alert.success("Order Updated Successfully");
            dispatch({type:"UPDATE_ORDER_RESET"});

        }
        dispatch(getorderdetail(id));

    },[dispatch,alert,error,id,isUpdated,updateError])


  return (
    <Fragment>
      <MetaData title="Process Order" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <div
              className="confirmOrderPage"
              style={{
                display: orderdetail.orderstatus === "Delivered" ? "block" : "grid",
              }}
            >
              <div>
                <div className="confirmshippingArea">
                  <Typography>Shipping Info</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p>Name:</p>
                      <span>{orderdetail.user && orderdetail.user.name}</span>
                    </div>
                    <div>
                      <p>Phone:</p>
                      <span>
                        {orderdetail.shippinginfo && orderdetail.shippinginfo.phone}
                      </span>
                    </div>
                    <div>
                      <p>Address:</p>
                      <span>
                        {orderdetail.shippinginfo &&
                          `${orderdetail.shippinginfo.address}, ${orderdetail.shippinginfo.city}, ${orderdetail.shippinginfo.state}, ${orderdetail.shippinginfo.pincode}, ${orderdetail.shippinginfo.country}`}
                      </span>
                    </div>
                  </div>

                  <Typography>Payment</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          orderdetail.paymentinfo &&
                          orderdetail.paymentinfo.status === "succeeded"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {orderdetail.paymentinfo &&
                        orderdetail.paymentinfo.status === "succeeded"
                          ? "PAID"
                          : "NOT PAID"}
                      </p>
                    </div>

                    <div>
                      <p>Amount:</p>
                      <span>{orderdetail.totalprice && orderdetail.totalprice}</span>
                    </div>
                  </div>

                  <Typography>Order Status</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          orderdetail.orderstatus && orderdetail.orderstatus === "Delivered"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {orderdetail.orderstatus && orderdetail.orderstatus}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="confirmCartItems">
                  <Typography>Your Cart Items:</Typography>
                  <div className="confirmCartItemsContainer">
                    {orderdetail.orderitem &&
                      orderdetail.orderitem.map((item) => (
                        <div key={item.product}>
                          <img src={item.image} alt="Product" />
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>{" "}
                          <span>
                            {item.quantity} X ${item.price} ={" "}
                            <b>${item.price * item.quantity}</b>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              
              <div
                style={{
                  display: orderdetail.orderstatus === "Delivered" ? "none" : "block",
                }}
              >
                <form
                  className="updateOrderForm"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1>Process Order</h1>

                  <div>
                    <AccountTree />
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Choose Category</option>
                      {orderdetail.orderstatus === "processing" && (
                        <option value="shipped">Shipped</option>
                      )}

                      {orderdetail.orderstatus === "shipped" && (
                        <option value="delivered">Delivered</option>
                      )}
                    </select>
                  </div>

                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                  >
                    Process
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
   
  );
};

export default Processorder;
