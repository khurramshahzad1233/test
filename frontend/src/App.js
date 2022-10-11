// import react from "react";
import './App.css';
import React,{ useEffect,useState } from 'react';
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js"

import WebFont from "webfontloader";

import Home from "./component/Home/Home.js";
import Productdetail from './component/product/Productdetail.js';
import Products from "./component/product/Products.js";
import Search from "./component/product/Search.js"
import LoginSignUp from './component/user/LoginSignUp.js';
import { loaduser } from './action/useraction';
import store from "./store.js"
import Useroptions from './component/layout/Header/Useroptions.js';
import { useSelector } from 'react-redux';
import Profile from "../src/component/user/Profile.js"
import ProtectedRoute from './component/route/Protectedroute.js';
import Updateprofile from './component/user/Updateprofile.js';
import Updatepassword from "./component/user/Updatepassword.js";
import Forgotpassword from './component/user/Forgotpassword.js';
import Resetpassword from "./component/user/Resetpassword.js";
import Cart from "./component/cart/Cart.js";
import Shipping from './component/cart/Shipping';
import Confirmorder from './component/cart/Confirmorder.js';
import axios from 'axios';
import Payment from './component/cart/Payment';
import {Elements} from "@stripe/react-stripe-js"
import {loadStripe} from "@stripe/stripe-js";
import Ordersuccess from "./component/cart/Ordersuccess.js"
import Myorder from './component/order/Myorder.js';
import Orderdetail from './component/order/Orderdetail';
import Dashboard from './component/admin/Dashboard';
import ProductList from './component/admin/ProductList.js';
import Newproduct from './component/admin/Newproduct';
import Updateproduct from './component/admin/Updateproduct';
import Orderlist from './component/admin/Orderlist';
import Processorder from './component/admin/Processorder.js';
import Userlist from './component/admin/Userlist.js';
import Updateuser from './component/admin/Updateuser';
import Productreview from './component/admin/Productreview';









function App() {

  const {isAuthenticated,user}=useSelector((state)=>state.userred);

  const [stripeapikey,setStripeapikey]=useState("");
  async function getstripeapikey(){
    const {data}=await axios.get("/api/stripeapikey");
    setStripeapikey(data.stripeapikey);
    
    
    
  };
  const stripePromise=loadStripe(stripeapikey);
    
  useEffect(()=>{
    WebFont.load({
      google:{
        families:["Roboto","Droid Sans","chilanka"]
      },
    });
    store.dispatch(loaduser());
    
    getstripeapikey();
    
  },[]); 
 
  return (
    
  <Router>

  <Header/>
  {isAuthenticated && <Useroptions user={user}/>}

  <Routes>
    <Route  path="/" element={<Home/>} />
    <Route path="/product/:id" element={<Productdetail/>} />
    <Route path="/products" element={<Products/>}/>
    <Route path="/search" element={<Search/>}/>
    <Route path="/products/:keyword" element={<Products/>}/>
    <Route path="/login" element={<LoginSignUp/>}/>
    
    <Route element={<ProtectedRoute/>}>
      <Route path="/account" element={<Profile/>} />
    </Route>
    
    <Route element={<ProtectedRoute/>}>
      <Route path="/me/update" element={<Updateprofile/>}/>
    </Route>
    
    <Route element={<ProtectedRoute/>}>
      <Route path="/password/update" element={<Updatepassword/>}/>
    </Route>

    <Route path='/password/forgot' element={<Forgotpassword/>}/>
    <Route path="/password/reset/:token" element={<Resetpassword/>}/>
    <Route path='/cart' element={<Cart/>}/>

    <Route element={<ProtectedRoute/>}>
      <Route path="login/shipping" element={<Shipping/>}/>
    </Route>

    <Route element={<ProtectedRoute/>}>
      <Route path='/order/confirm' element={<Confirmorder/>}/>
    </Route>

    
    {stripeapikey && (
      
      <Route element={<ProtectedRoute/>}>
      <Route path='/process/payment' element={ (<Elements stripe={stripePromise}><Payment/></Elements>)}/>
    </Route>
    )};

      <Route element={<ProtectedRoute/>}>
      <Route path="/success" element={<Ordersuccess/>}/>
      </Route>  

      <Route element={<ProtectedRoute/>}>
        <Route path='/orders' element={<Myorder/>}/>
      </Route>

      <Route element={<ProtectedRoute/>}>
        <Route path='/order/:id' element={<Orderdetail/>}/>
      </Route>

      <Route element={<ProtectedRoute isAdmin={true}/>}>
        <Route path='/admin/dashboard'  element={<Dashboard/>}/>
      </Route>

      <Route element={<ProtectedRoute isAdmin={true}/>}>
        <Route path='/admin/products' element={<ProductList/>}/>
      </Route>

      <Route element={<ProtectedRoute isAdmin={true}/>}>
        <Route path="/admin/product" element={<Newproduct/>}/>
      </Route>

      <Route element={<ProtectedRoute isAdmin={true}/>}>
        <Route path='/admin/product/:id' element={<Updateproduct/>}/>
      </Route>

      <Route element={<ProtectedRoute isAdmin={true}/>}>
        <Route path='/admin/orders' element={<Orderlist/>}/>
      </Route>

      <Route element={<ProtectedRoute isAdmin={true}/>}>
        <Route path="/admin/order/:id" element={<Processorder/>}/>
      </Route>

      <Route element={<ProtectedRoute isAdmin={true}/>}>
        <Route path="/admin/users" element={<Userlist/>}/>
      </Route>

      <Route element={<ProtectedRoute isAdmin={true}/>}>
        <Route path="/admin/user/:id" element={<Updateuser/>}/>
      </Route>

      <Route element={<ProtectedRoute isAdmin={true}/>}>
        <Route path="/admin/reviews" element={<Productreview/>}/>
      </Route>

    



    
       

  </Routes>
  <Footer/>
  </Router>
      
     
  );
}


export default App;
