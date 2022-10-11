import React,{Fragment,useEffect,useState} from 'react'
import {DataGrid} from "@mui/x-data-grid"
import "./Productreview.css"
import {useSelector,useDispatch} from "react-redux"
import {useAlert} from "react-alert"
import { Button } from '@mui/material' 
import MetaData from "../layout/MetaData.js"
import Sidebar from "./Sidebar.js"
import { Delete,Star, } from '@mui/icons-material'
import { clearerror, deletereview, getallreview } from '../../action/productaction';
import {useNavigate} from "react-router-dom"


const Productreview = () => {
    const dispatch=useDispatch()
    const alert=useAlert()
    const navigate=useNavigate()
    const {error:deleteError,isDeleted}=useSelector((state)=>state.deletereviewred);
    const {error,allreview,loading}=useSelector((state)=>state.allreviewred);


    const [productId,setProductId]=useState("");
    const deleteReviewHandler=(reviewId)=>{
        dispatch(deletereview(reviewId,productId));
    };

    const productReviewsSubmitHandler=(e)=>{
        e.preventDefault();
        dispatch(getallreview(productId));

    };

    useEffect(()=>{
        if(productId.length===24){
            dispatch(getallreview(productId));
        }
        if(error){
            alert.error(error);
            dispatch(clearerror());
        }
        if(deleteError){
            alert.error(deleteError);
            dispatch(clearerror());
        }
        if(isDeleted){
            alert.success("Review Deleted Successfully");
            navigate("/admin/reviews");
            dispatch({type:"DELETE_REVIEW_RESET"});

        }
    },[dispatch,alert,navigate,error,deleteError,isDeleted,productId,]);

    const columns=[
        {
            field:"id",
            headerName:'Review ID',
            minWidth:200,
            flex:0.5,
        },{
            field:"user",
            headerName:"User",
            minWidth:200,
            flex:0.6,
        },{
            field:"comment",
            headerName:"Comment",
            minWidth:350,
            flex:1,
        },{
            field:"rating",
            headerName:"Rating",
            minWidth:180,
            type:"number",
            flex:0.4,
            cellClassName:(params)=>{
                return params.getValue(params.id,"rating")>=3?"greenColor":"redColor";
            },
        },{
            field:"actions",
            headerName:"Actions",
            minWidth:150,
            flex:0.3,
            type:"number",
            sortable:false,
            renderCell:(params)=>{
                return (
                    <Fragment><Button
                    onClick={()=>deleteReviewHandler(params.getValue(params.id,"id"))}
                    ><Delete/></Button></Fragment>
                );
            },
        },
    ];
    const rows=[];
    allreview && allreview.forEach((item)=>{
        rows.push({
            id:item._id,
            rating:item.rating,
            comment:item.comment,
            user:item.name,
        });
    });
  return (
    <Fragment>
        <MetaData title={`ALL REVIEWS -ADMIN`}/>
        <div className="dashboard">
            <Sidebar/>
            <div className="productReviewsContainer">
                <form
                className="productReviewsForm"
                onSubmit={productReviewsSubmitHandler}
                >
                    <h1 className='productReviewsFormHeading'>All Reviews</h1>
                    <div>
                        <Star/>
                        <input
                        type="text"
                        placeholder='Product Id'
                        required
                        value={productId}
                        onChange={(e)=>setProductId(e.target.value)}
                        />
                    </div>
                    <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={
                        loading?true:false||productId===""?true:false
                    }
                    >Search</Button>
                </form>

                {allreview && allreview.length>0?(
                    <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    className='productListTable'
                    autoHeight
                    />
                    
                ):(
                    <h1 className="productReviewsFormHeading">No Reviews Found</h1>
                )}
            </div>
        </div>

    </Fragment>
  );
};

export default Productreview;