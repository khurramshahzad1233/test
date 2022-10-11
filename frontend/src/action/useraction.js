import axios from "axios";
// login

export const login=(email,password)=>async(dispatch)=>{
    try {
        dispatch({type:"LOGIN_REQUEST"});
        const config={headers:{"Content-Type":"application/json"}};
        const {data}=await axios.post(
            `/api/login`,
            {email,password},
            config);
       

        dispatch({
            type:"LOGIN_SUCCESS",
            payload:data
        });
        
    } catch (error) {
        dispatch({
            type:"LOGIN_FAIL",
            payload:error.response.data.message
        });
        
        
    }

};


// register
export const  register=(userData)=>async(dispatch)=>{
    try {
        dispatch({
            type:"REGISTER_USER_REQUEST"
        });
        const config={headers:{"content-type":"multipart/form-data"}};
        const {data}=await axios.post(`/api/register`,userData,config);
        dispatch({
            type:"REGISTER_USER_SUCCESS",
            payload:data
        });
        
    } catch (error) {
        dispatch({
            type:"REGISTER_USER_FAIL",
            payload:error.response.data.message,
        });
        
    }
};

// loaduser
export const loaduser=()=>async(dispatch)=>{
    try {
        dispatch({type:"LOAD_USER_REQUEST"});

        
        const {data}=await axios.get(`/api/me`);
        dispatch({
            type:"LOAD_USER_SUCCESS",
            payload:data
        })
        
        
    } catch (error) {
        dispatch({
            type:"LOAD_USER_FAIL",
            payload:error.response.data.message,
        })
        
    }
}

// LOGOUT USER

export const logout=()=>async(dispatch)=>{
    try {
        await axios.get("/api/logout")
        dispatch({type:"LOGOUT_SUCCESS"})
    } catch (error) {
        dispatch({
            type:"LOGOUT_FAIL",
            payload:error.response.data.message
        })
        
    }

}






// clearerror

export const clearerror=()=>(dispatch)=>{
    
    dispatch({type:"CLEAR_ERROR"})
}



// all user by admin

export const getalluser=()=>async(dispatch)=>{
    try {
        dispatch({type:"ALL_USER_REQUEST"});
        const {data}=await axios.get(`/api/admin/user`);
        dispatch({
            type:"ALL_USER_SUCCESS",
            payload:data.users
        })
        
    } catch (error) {
        dispatch({
            type:"ALL_USER_FAIL",
            payload:error.response.data.message
        });
        
    }
};

// user detail by admin

export const getuserdetail=(id)=>async(dispatch)=>{
    try {
        dispatch({type:"USER_DETAIL_REQUEST"});
        const {data}=await axios.get(`/api/admin/user/${id}`)
        dispatch({
            type:"USER_DETAIL_SUCCESS",
            payload:data.user,
        });
        
    } catch (error) {
        dispatch({
            type:"USER_DETAIL_FAIL",
            payload:error.response.data.message,
        })
        
    }
}


// update user by admin

export const updateuser=(id,userData)=>async(dispatch)=>{
    try {
        dispatch({type:"UPDATE_USER_REQUEST"});
        const config={
            headers:{
                "content-type":"application/json"
            }
        };
        const{data}=await axios.put(`/api/admin/user/${id}`,userData,config);
        dispatch({
            type:"UPDATE_USER_SUCCESS",
            payload:data.success
        });
        
    } catch (error) {
        dispatch({
            type:"UPDATE_USER_FAIL",
            payload:error.response.data.message,
        });
        
    }
};

// delete user by admin 
export const deleteuser=(id)=>async(dispatch)=>{
    try {
        dispatch({type:"DELETE_USER_REQUEST"});
        const {data}=await axios.delete(`/api/admin/user/${id}`);
        dispatch({
            type:"DELETE_USER_SUCCESS",
            payload:data
        });
        
    } catch (error) {
        dispatch({
            type:"DELETE_USER_FAIL",
            payload:error.response.data.message,
        })
        
    }
}

