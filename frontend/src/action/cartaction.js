import axios from "axios";
export const additemtocart=(id,quantity)=>async(dispatch,getstate)=>{
    const {data}=await axios.get(`/api/product/${id}`);

    dispatch({
        type:"ADD_TO_CART",
        payload:{
            product:data.product._id,
            name:data.product.name,
            price:data.product.price,
            image:data.product.image[0].url,
            stock:data.product.stock,
            quantity,
        },

    });
    localStorage.setItem("cartItems",JSON.stringify(getstate().cartred.cartItems))
};


// REMOVE FROM CART
export const removeitemfromcart=(id)=>async(dispatch,getstate)=>{
    dispatch({
        type:"REMOVE_CART_ITEM",
        payload:id,
    });

    localStorage.setItem("cartItems",JSON.stringify(getstate().cartred.cartItems))
    

};

// SAVE SHIPPING INFO
export const saveshippinginfo=(data)=>async(dispatch)=>{
    dispatch({
        type:"SAVE_SHIPPING_INFO",
        payload:data,
    });
    localStorage.setItem("shippingInfo",JSON.stringify(data));
};

