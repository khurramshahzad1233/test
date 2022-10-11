import {createReducer} from "@reduxjs/toolkit"


const userinitialstate={
    user:{}
};

export const userloginreducer=createReducer(userinitialstate,{
    LOGIN_REQUEST:(state,action)=>{
        return{
            loading:true,
            isAuthenticated:false,
        }
    },
    LOGIN_SUCCESS:(state,action)=>{
        return{
            ...state,
            loading:false,
            user:action.payload.user, 
            isAuthenticated:true,
        }
    },
    LOGIN_FAIL:(state,action)=>{
        return{
            ...state,
            loading:false,
            isAuthenticated:false,
            user:null,
            error:action.payload
        }
    },
    CLEAR_ERROR:(state,action)=>{
        return{
            ...state,
            error:null
        }
    },
    default:(state,action)=>{
        return{
            state,
            
        }
    },
    REGISTER_USER_REQUEST:(state,action)=>{
        return{
            loading:true,
            isAuthenticated:false,
        }
    },
    REGISTER_USER_SUCCESS:(state,action)=>{
        return{
            ...state,
            loading:false,
            isAuthenticated:true,
            user:action.payload.user
        }
    },
    REGISTER_USER_FAIL:(state,action)=>{
        return{
            ...state,
            loading:false,
            isAuthenticated:false,
            user:null,
            error:action.payload
        }
    },


    LOAD_USER_REQUEST:(state,action)=>{
        return{
            
            loading:true,
            isAuthenticated:false,

        }
        
    },
    LOAD_USER_SUCCESS:(state,action)=>{
        return{
            ...state,
            loading:false,
            isAuthenticated:true,
            user:action.payload.user,
        }
    },
    LOAD_USER_FAIL:(state,action)=>{
        return{
            
            loading:false,
            isAuthenticated:false,
            user:null,
            error:action.payload,
        }
    },
    LOGOUT_SUCCESS:(state,action)=>{
        return{
            loading:false,
            user:null,
            isAuthenticated:false
        }
    },
    LOGOUT_FAIL:(state,action)=>{
        return{
            ...state,
            loading:false,
            error:action.payload,
            
        }
    }

});




// admin user all

let alluserinitialstate={
    alluser:[]
};
export const alluserreducer=createReducer(alluserinitialstate,{
    ALL_USER_REQUEST:(state,action)=>{
        return{
            ...state,
            loading:true,
        }
    },
    ALL_USER_SUCCESS:(state,action)=>{
        return{
            ...state,
            loading:false,
            alluser:action.payload,
        }
    },
    ALL_USER_FAIL:(state,action)=>{
        return{
            ...state,
            loading:false,
            error:action.payload,
        }
    },
    CLEAR_ERROR:(state,action)=>{
        return{
            ...state,
            error:null,
        }
    },
    defaul:(state,action)=>{
        return{
            state,
        }
    }
});

//  user detail by admin

let userdetailinitialstate={
    userdetail:{}
};
export const userdetailreducer=createReducer(userdetailinitialstate,{
    USER_DETAIL_REQUEST:(state,action)=>{
        return{
            ...state,
            loading:true
        }
    },
    USER_DETAIL_SUCCESS:(state,action)=>{
        return{
            ...state,
            loading:false,
            userdetail:action.payload,
        }
    },
    USER_DETAIL_FAIL:(state,action)=>{
        return{
            ...state,
            loading:false,
            error:action.payload,
        }
    },
    CLEAR_ERROR:(state,action)=>{
        return{
            ...state,
            error:null
        }
    },
    default:(state,action)=>{
        return{
            state
        }
    }
})


// update user by admin

let updateuserinitialstate={
    updateuser:{}
}
export const updateuserreducer=createReducer(updateuserinitialstate,{
    
    UPDATE_USER_REQUEST:(state,action)=>{
            return{
                ...state,
                loading:true,
            }
        },
    
    UPDATE_USER_SUCCESS:(state,action)=>{
        return{
            ...state,
            loading:false,
            isUpdated:action.payload,
        }
    },
    UPDATE_USER_FAIL:(state,action)=>{
        return{
            ...state,
            loading:false,
            error:action.payload,
        }
    },
    UPDATE_USER_RESET:(state,action)=>{
        return{
            ...state,
            isUpdated:false,
        }
    },
    CLEAR_ERROR:(state,action)=>{
        return{
            ...state,
            error:null,
        }
    },
    default:(state,action)=>{
        return{
            state,
        }
    }
});


// delete user by admin


let deleteuserinitialstate={
    deleteuser:{}
};
export const deleteuserreducer=createReducer(deleteuserinitialstate,{
    DELETE_USER_REQUEST:(state,action)=>{
        return{
            ...state,
            loading:true,
        }
    },
    DELETE_USER_SUCCESS:(state,action)=>{
        return{
            ...state,
            loading:false,
            isDeleted:action.payload.success,
            message:action.payload.message,
        }
    },
    DELETE_USER_FAIL:(state,action)=>{
        return{
            ...state,
            loading:false,
            error:action.payload,
        }
    },
    DELETE_USER_RESET:(state,action)=>{
        return{
            ...state,
            idDeleted:false,
        }
    },
    CLEAR_ERROR:(state,action)=>{
        return{
            ...state,
            error:null,
        }
    },
    default:(state,action)=>{
        return{
            state,
        }
    }

})



