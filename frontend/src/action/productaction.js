import axios from "axios";

export const getproduct=(keyword="",currentPage=1,price=[0,25000],category,ratings=0)=>async(dispatch)=>{
    try {
        dispatch({type:"ALL_PRODUCT_REQUEST"});

        let link=`/api/product?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

        if(category){
            {category &&
            category==="all"?(link=`/api/product?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`):(link=`/api/product?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`)}
        }

        // if(category){
        // link=`/api/product?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`};

        const {data}=await axios.get(link);
        dispatch({
            type:"ALL_PRODUCT_SUCCESS",
            payload:data,
        })
        
    } catch (error) {
        dispatch({
            type:"ALL_PRODUCT_FAIL",
            payload:error.response.data.message
        })
        
    }
};

export const getproductdetail=(id)=>async(dispatch)=>{
    try {
        dispatch({type:"PRODUCT_DETAIL_REQUEST"});
        const {data}=await axios.get(`/api/product/${id}`);
            
        dispatch({
            type:"PRODUCT_DETAIL_SUCCESS",
            payload:data

                
            });
        
        
    } catch (error) {
        dispatch({
            type:"PRODUCT_DETAIL_FAIL",
            payload:error.response.data.message
        })
        
    }
}


export const clearerror=()=>async(dispatch)=>{
    dispatch({type:"CLEAR_ERROR"});
};


// new review
export const newreview=(reviewData)=>async(dispatch)=>{
    try {
        dispatch({
            type:"NEW_REVIEW_REQUEST"
        });
        const config={headers:{
            "content-type":"application/json"
        }};
        const {data}=await axios.put(`/api/review`,reviewData,config);

        dispatch({
            type:"NEW_REVIEW_SUCCESS",
            payload:data.success
        })
        
    } catch (error) {
        dispatch({
            type:"NEW_REVIEW_FAIL",
            payload:error.response.data.message,
        });
        
    }
};


// admin product action?////////////////////


export const getadminproduct=()=>async(dispatch)=>{
    try {
        dispatch({type:"ADMIN_PRODUCT_REQUEST"});
        const {data}=await axios.get("/api/admin/products");
        dispatch({
            type:"ADMIN_PRODUCT_SUCCESS",
            payload:data.products
        })
        
    } catch (error) {
        dispatch({
            type:"ADMIN_PRODUCT_FAIL",
            payload:error.response.data.message,
        });
    }
};


export const createnewproduct=(productData)=>async(dispatch)=>{
    try {
        dispatch({type:"NEW_PRODUCT_REQUEST"});
        const config={
            headers:{"content-type":"application/json"},
        };
        const {data}=await axios.post(`/api/admin/product/new`,productData,config);
        dispatch({
            type:"NEW_PRODUCT_SUCCESS",
            payload:data,
        });
        
    } catch (error) {
        dispatch({
            type:"NEW_PRODUCT_FAIL",
            payload:error.response.data.message
        });
        
    }
};

// delete product admin
export const deleteproduct=(id)=>async(dispatch)=>{
    try {
        dispatch({type:"DELETE_PRODUCT_REQUEST"});
        const {data}=await axios.delete(`/api/admin/product/${id}`);

        dispatch({
            type:"DELETE_PRODUCT_SUCCESS",
            payload:data.success,
        });
        
    } catch (error) {
        dispatch({
            type:"DELETE_PRODUCT_FAIL",
            payload:error.response.data.message,
        });
        
    }
}

// updata admin product
export const updateproduct=(id,productData)=>async(dispatch)=>{
    try {
        dispatch({type:"UPDATE_PRODUCT_REQUEST"});
        const config={
            headers:{"content-type":"application/json"},
        };
        const {data}=await axios.put(`/api/admin/product/${id}`,productData,config)

        dispatch({
            type:"UPDATE_PRODUCT_SUCCESS",
            payload:data.success,
        })

        
    } catch (error) {
        dispatch({
            type:"UPDATE_PRODUCT_FAIL",
            payload:error.response.data.message,
        });
        
    }
}


// all review by admin

export const getallreview=(id)=>async(dispatch)=>{
    try {
        dispatch({type:"ALL_REVIEW_REQUEST"});
        const {data}=await axios.get(`/api/reviews?id=${id}`);
        dispatch({
            type:"ALL_REVIEW_SUCCESS",
            payload:data.reviews,
        });
        
    } catch (error) {
        dispatch({
            type:"ALL_REVIEW_FAIL",
            payload:error.response.data.message,
        })
        
    }
};

// delete review by admin 

export const deletereview=(reviewId,productId)=>async(dispatch)=>{
    try {
        dispatch({type:"DELETE_REVIEW_REQUEST"});
        const {data}=await axios.delete(`/api/reviews?id=${reviewId}&productId=${productId}`)

        dispatch({
            type:"DELETE_REVIEW_SUCCESS",
            payload:data.success,
        })
        
    } catch (error) {
        dispatch({
            type:"DELETE_REVIEW_FAIL",
            payload:error.response.data.message,
        })
        
    }
}








// try {
//     dispatch({type:"ALL_PRODUCT_REQUEST"});
//     let link=`/api/search?keyword=${keyword}&page=${currentpage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

//     if(category){

//     {category &&
//     category==="all"?(link=`/api/search?keyword=${keyword}&page=${currentpage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`):(link=`/api/search?keyword=${keyword}&page=${currentpage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}&category=${category}`)
//     }}


//     // if(category==="all"){
//     //     link=`/api/search?keyword=${keyword}&page=${currentpage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`
//     // }
    
//     // if(category!=="all"){
//     //     link=`/api/search?keyword=${keyword}&page=${currentpage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}&category=${category}`
//     // };
//     console.log(link)
//     const {data}=await axios.get(link);
//     dispatch({
//         type:"ALL_PRODUCT_SUCCESS",
//         payload:data,
//     })
    
// } catch (error) {
//     dispatch({
//         type:"ALL_PRODUCT_FAIL",
//         payload:error.response.data.message
//     })
    
// }
// };

