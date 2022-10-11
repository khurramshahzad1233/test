import axios from "axios";

export const updateprofile=(userdata)=>async(dispatch)=>{
    try {
        dispatch({type:"UPDATE_PROFILE_REQUEST"});
        const config={headers:{
            "Content-Type" : "multipart/form-data"
        }};
        const {data}=await axios.put(`/api/me/update`,userdata,config);
        dispatch({
            type:"UPDATE_PROFILE_SUCCESS",
            payload:data.success,
        });

    } catch (error) {
        dispatch({
        type:"UPDATE_PROFILE_FAIL",
        payload:error.response.data.message,
    });        
    }
};





// UPDATE PASSWORD
export const updatepassword=(passwords)=>async(dispatch)=>{
    try {
        dispatch({type:"UPDATE_PASSWORD_REQUEST"});
        const config={headers:{
            "content-type":"application/json"
        }};
        const {data}=await axios.put(`/api/password/update`,passwords,config);
        dispatch({
            type:"UPDATE_PASSWORD_SUCCESS",
            payload:data.success
        });
        
    } catch (error) {
        dispatch({
            type:"UPDATE_PASSWORD_FAIL",
            payload:error.response.data.message,
        });
        
    }
};

// FORGOT PASSWORD
export const forgotpassword=(email)=>async(dispatch)=>{
    try {
        dispatch({type:"FORGOT_PASSWORD_REQUEST"});
        const config={headers:{
            "content-type":"application/json"
        }};
        const {data}=await axios.post(`/api/password/forgot`,email,config);
        dispatch({
            type:"FORGOT_PASSWORD_SUCCESS",
            payload:data.message,
        });
        
    } catch (error) {
        dispatch({
            type:"FORGOT_PASSWORD_FAIL",
            payload:error.response.data.message,
        });
        
    }
};

// RESET PASSWORD
export const resetpassword=(token,passwords)=>async(dispatch)=>{
    try {
        dispatch({type:"RESET_PASSWORD_REQUEST"});
        const config={headers:{
            "content-type":"application/json"
        }};
        const {data}=await axios.put(`/api/password/reset/${token}`,passwords,config);
        dispatch({
            type:"RESET_PASSWORD_SUCCESS",
            payload:data
        });
        
    } catch (error) {
        dispatch({
            type:"RESET_PASSWORD_FAIL",
            payload:error.response.data.message,
        });
        
    }
};




export const clearerrors=()=>async(dispatch)=>{
    dispatch({type:"CLEAR_ERROR"});
}