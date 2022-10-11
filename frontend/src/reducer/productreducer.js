import {createReducer} from "@reduxjs/toolkit"


const productinitialstate={
    products:[]
}
export const productreducer=createReducer(productinitialstate,{
    ALL_PRODUCT_REQUEST:(state,action)=>{
       return {
        loading:true,
        products:[]
       }

    },
    ALL_PRODUCT_SUCCESS:(state,action)=>{
        return{
            loading:false,
            products:action.payload.product,
            productcount:action.payload.productcount,
            resultPerPage:action.payload.resultperpage,
            filteredProductsCount:action.payload.filteredProductsCount

        }
    },
    ALL_PRODUCT_FAIL:(state,action)=>{
        return{
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
    }
    
});

let initionalstate={
    product:{ }

}

export const productdetailreducer=createReducer(initionalstate,{
    PRODUCT_DETAIL_REQUEST:(state,action)=>{
        return {
            loading:true,
            ...state
        }

    },
    PRODUCT_DETAIL_SUCCESS:(state,action)=>{
        return{
            loading:false,
            product:action.payload.product
            
        }
    },
    PRODUCT_DETAIL_FAIL:(state,action)=>{
        return{
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
    }

});


let newreviewreducerinitialstate={
    newreview:{}
};
export const newreviewreducer=createReducer(newreviewreducerinitialstate,{
    NEW_REVIEW_REQUEST:(state,action)=>{
        return{
            ...state,
            loading:true,
        }
    },
    NEW_REVIEW_SUCCESS:(state,action)=>{
        return{
            loading:false,
            success:action.payload,
        }
    },
    NEW_REVIEW_FAIL:(state,action)=>{
        return{
            ...state,
            loading:false,
            error:action.payload,
        }
    },
    NEW_REVIEW_RESET:(state,action)=>{
        return{
            ...state,
            success:false,
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



// admin reducer/////////////////////////
let adminproductinitialstate={
    adminproducts:[]
};
export const alladminproductreducer=createReducer(adminproductinitialstate,{
    ADMIN_PRODUCT_REQUEST:(state,action)=>{
        return{
            loading:true,
            adminproducts:[]
        }
    },
    ADMIN_PRODUCT_SUCCESS:(state,action)=>{
        return{
            loading:false,
            adminproducts:action.payload,
        }
    },
    ADMIN_PRODUCT_FAIL:(state,action)=>{
        return{
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
            state,
        }
    }
});

// new product reducer
let newadminproductinitialstate={
    newadminproduct:{}
}
export const newadminproductreducer=createReducer(newadminproductinitialstate,{
    NEW_PRODUCT_REQUEST:(state,action)=>{
        return{
            ...state,
            loading:true
        }
    },
    NEW_PRODUCT_SUCCESS:(state,action)=>{
        return{
            loading:false,
            success:action.payload.success,
            product:action.payload.product,
        }
    },
    NEW_PRODUCT_FAIL:(state,action)=>{
        return{
            loading:false,
            error:action.payload,
        }
    },
    NEW_PRODUCT_RESET:(state,action)=>{
        return{
            ...state,
            success:false,
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
            state
        }
    }
});


let deleteproductinitialstate={
    deleteproduct:{}
};

export const deleteproductreducer=createReducer(deleteproductinitialstate,{
    DELETE_PRODUCT_REQUEST:(state,action)=>{
        return{
            ...state,
            loading:true,
        }
    },
    DELETE_PRODUCT_SUCCESS:(state,action)=>{
        return{
            ...state,
            loading:false,
            isDeleted:action.payload,
        }
    },
    DELETE_PRODUCT_FAIL:(state,action)=>{
        return{
            ...state,
            loading:false,
            error:action.payload,
        }
    },
    DELETE_PRODUCT_RESET:(state,action)=>{
        return{
            ...state,
            isDeleted:false,
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
    }
})

// update admin product
let updateproductinitialstate={
    updateproduct:{}
}
export const updateproductreducer=createReducer(updateproductinitialstate,{
    UPDATE_PRODUCT_REQUEST:(state,action)=>{
        return{
            ...state,
            loading:true,
        }
    },
    UPDATE_PRODUCT_SUCCESS:(state,action)=>{
        return{
            ...state,
            loading:false,
            isUpdated:action.payload,

        }
    },
    UPDATE_PRODUCT_FAIL:(state,action)=>{
        return{
            ...state,
            loading:false,
            error:action.payload,

        }
    },
    UPDATE_PRODUCT_RESET:(state,aciton)=>{
        return{
            ...state,
            isUpdated:false,

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
    }
})

// all review by admin

let allreviewinitialstate={
    allreview:[]
}
export const allreviewreducer=createReducer(allreviewinitialstate,{
    "ALL_REVIEW_REQUEST":(state,action)=>{
        return{
            ...state,
            loading:false,
        }
    },
    ALL_REVIEW_SUCCESS:(state,action)=>{
        return{
            loading:false,
            allreview:action.payload,
        }
    },
    ALL_REVIEW_FAIL:(state,action)=>{
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
    }
});


// delete review by admin

let deletereviewinitialstate={
    deletereview:{}
};
export const deletereviewreducer=createReducer(deletereviewinitialstate,{
    DELETE_REVIEW_REQUEST:(state,action)=>{
        return{
            ...state,
            loading:true,
        }
    },
    DELETE_REVIEW_SUCCESS:(state,action)=>{
        return{
            ...state,
            loading:false,
            isDeleted:action.payload,
        }
    },
    DELETE_REVIEW_FAIL:(state,action)=>{
        return{
            ...state,
            loading:false,
            error:action.payload,
        }
    },
    DELETE_REVIEW_RESET:(state,action)=>{
        return{
            ...state,
            isDeleted:false,
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
            state
        }
    }

})