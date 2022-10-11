import {createReducer} from "@reduxjs/toolkit";

const userinitialstate={
    user:{}
} ;
export const profilereducer=createReducer(userinitialstate,{
    UPDATE_PROFILE_REQUEST:(state,action)=>{
        return{
            ...state,
            loading:true,
            
        }
    },
    UPDATE_PROFILE_SUCCESS:(state,action)=>{
        return{
            ...state,
            loading:false,
            isUpdated:action.payload,
            
        }
    },
    UPDATE_PROFILE_RESET:(state,action)=>{
        return{
            ...state,
            isUpdated:false,
        }

    },
    UPDATE_PROFILE_FAIL:(state,action)=>{
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
    default:(state,action)=>{
        return{
            state,
        }
    },
    UPDATE_PASSWORD_REQUEST:(state,action)=>{
        return{
            ...state,
            loading:true,
        }
    },
    UPDATE_PASSWORD_SUCCESS:(state,action)=>{
        return{
            ...state,
            loading:false,
            isUpdated:action.payload


        }
    },
    UPDATE_PASSWORD_FAIL:(state,action)=>{
        return{
            ...state,
            loading:false,
            error:action.payload,
            
        }
    },
    UPDATE_PASSWORD_RESET:(state,action)=>{
        return{
            ...state,
            isUpdated:false,
        }
    }
});


// FORGOT PASSWORD

const forgotpasswordinitialstate={
    user:{}
};

export const forgotpasswordreducer=createReducer(forgotpasswordinitialstate,{
    FORGOT_PASSWORD_REQUEST:(state,action)=>{
        return{
            ...state,
            loading:true,
            error:null,
        }
    },
    FORGOT_PASSWORD_SUCCESS:(state,action)=>{
        return{
            ...state,
            loading:false,
            message:action.payload,

        }
    },
    FORGOT_PASSWORD_FAIL:(state,action)=>{
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
    default:(state,action)=>{
        return{
            state,
        }
    },
    RESET_PASSWORD_REQUEST:(state,action)=>{
        return{
            ...state,
            loading:true,
            error:null
        }
    },
    RESET_PASSWORD_SUCCESS:(state,action)=>{
        return{
            ...state,
            loading:false,
            success:action.payload.success,
        }
    },
    RESET_PASSWORD_FAIL:(state,action)=>{
        return{
            ...state,
            loading:false,
            error:action.payload,
        }
    }

});

