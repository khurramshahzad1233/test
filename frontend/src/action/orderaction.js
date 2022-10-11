import axios from "axios";
export const createorder=(order)=>async(dispatch)=>{
    try {
        dispatch({type:"CREATE_ORDER_REQUEST"});

        const config={headers:{
            "content-type":"application/json"
        }};
        const {data}=await axios.post("/api/order/new",order,config);
        

        dispatch({
            type:"CREATE_ORDER_SUCCESS", 
            payload:data,

        
        })
    } catch (error) {
        dispatch({
            type:"CREATE_ORDER_FAIL",
            payload:error.response.data.message,
        })
        
    }
};

export const clearerror=()=>async(dispatch)=>{
    dispatch({type:"CLEAR_ERROR"});
};



export const myorder=()=>async(dispatch)=>{
    try {
        dispatch({type:"MY_ORDER_REQUEST"});
        const {data}=await axios.get("/api/order/me");
        dispatch({
            type:"MY_ORDER_SUCCESS",
            payload:data,
        });
    } catch (error) {
        dispatch({
            type:"MY_ORDER_FAIL",
            payload:error.response.data.message,
        })
        
    }
};

// get order details
export const getorderdetail=(id)=>async(dispatch)=>{
    try {
        dispatch({
            type:"ORDER_DETAIL_REQUEST"
        })
        const {data}=await axios.get(`/api/order/${id}`);
        dispatch({
            type:"ORDER_DETAIL_SUCCESS",
            payload:data,
        })
        
    } catch (error) {
        
        dispatch({
            type:"ORDER_DETAIL_FAIL",
            payload:error.response.data.message,
        });
    }

};


// admin routes


export const getallorder=()=>async(dispatch)=>{
    try {
        dispatch({type:"ALL_ORDER_REQUEST"});
        const {data}=await axios.get(`/api/admin/orders`);
        dispatch({
            type:"ALL_ORDER_SUCCESS",
            payload:data.orders
        })
        
    } catch (error) {
        dispatch({
            type:"ALL_ORDER_FAIL",
            payload:error.response.data.message,
        });
        
    }
};


// update admin order

export const updateorder=(id,order)=>async(dispatch)=>{
    try {
        dispatch({
            type:"UPDATE_ORDER_REQUEST"
        });
        const config={
            headers:{"content-type":"application/json"}
        };
        const {data}=await axios.put(`/api/admin/order/${id}`,order,config);

        dispatch({
            type:"UPDATE_REQUEST_SUCCESS",
            payload:data.success
        });
        
    } catch (error) {
        dispatch({
            type:"UPDATE_ORDER_FAIL",
            payload:error.response.data.message,
        });
        
    }
};


// delte order action

export const deleteorder=(id)=>async(dispatch)=>{
    try {
        dispatch({type:"DELETE_ORDER_REQUEST"});
        const{data}=await axios.delete(`/api/admin/order/${id}`);
        dispatch({
            type:"DELETE_ORDER_SUCCESS",
            payload:data.success,
        })
        
    } catch (error) {
        dispatch({
            type:"DELETE_ORDER_FAIL",
            payload:error.response.data.message,
        })
        
    }
}
