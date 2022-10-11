import {configureStore} from "@reduxjs/toolkit";
import { cartreducer } from "./reducer/cartreducer.js";
import { allorderreducer, deleteorderreducer, myorderreducer, neworderreducer, orderdetailreducer, updateorderreducer } from "./reducer/orderreducer.js";
import { alladminproductreducer, allreviewreducer, deleteproductreducer, deletereviewreducer, newadminproductreducer, newreviewreducer, productdetailreducer, productreducer, updateproductreducer } from "./reducer/productreducer.js";
import { forgotpasswordreducer, profilereducer } from "./reducer/updateprofilerreducer.js";
import { alluserreducer, deleteuserreducer, updateuserreducer, userdetailreducer, userloginreducer } from "./reducer/userreducer.js";
const store=configureStore({
    reducer:{
        productred:productreducer,
        productdetail:productdetailreducer,
        userred:userloginreducer,
        profilered:profilereducer,
        forgotpasswordred:forgotpasswordreducer,
        cartred:cartreducer,
        neworderred:neworderreducer,
        myorderred:myorderreducer,
        orderdetailred:orderdetailreducer,
        newreviewred:newreviewreducer,
        alladminproductred:alladminproductreducer,
        newadminproductred:newadminproductreducer,
        deleteproductred:deleteproductreducer,
        updateproductred:updateproductreducer,
        allorderred:allorderreducer,
        updateorderred:updateorderreducer,
        deleteorderred:deleteorderreducer,
        alluserred:alluserreducer,
        userdetailred:userdetailreducer,
        updateuserred:updateuserreducer,
        deleteuserred:deleteuserreducer,
        allreviewred:allreviewreducer,
        deletereviewred:deletereviewreducer,

    }

});
export default store;
