import React,{Fragment,useEffect} from 'react';
import "./Myorder.css";
import { useDispatch,useSelector } from 'react-redux';
import {clearerror,myorder} from "../../action/orderaction.js";
import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import {Launch} from "@mui/icons-material";

import { DataGrid} from '@mui/x-data-grid';


const Myorder = () => {

    const dispatch=useDispatch();
    const alert=useAlert();

    const {user}=useSelector((state)=>state.userred);
    const {loading,error,userorder}=useSelector((state)=>state.myorderred);

    const columns=[
        {field:"id", headerName:"Order ID", minWidth:300,flex:1},
        {
            field:"status",
            headerName:"Status",
            minWidth:150,
            flex:0.5,
            cellClassName:(params)=>{
                return params.getValue(params.id,"status")==="Delivered"
                ?"greenColor":"redColor"
            },
        },
            {
                field:"itemsQty",
                headerName:"Items Qty",
                type:"number",
                minWidth:150,
                flex:0.3,
            },
            {
                field:"amount",
                headerName:"Amount",
                type:"number",
                minWidth:270,
                flex:0.5,

            },
            {
                field:"actions",
                headerName:"Actions",
                minWidth:150,
                flex:0.3,
                type:"number",
                sortable:false,
                renderCell:(params)=>{
                    return(
                        <Link to={`/order/${params.getValue(params.id,"id")}`}>
                        <Launch/></Link>
                    )
                },
            },
    ];

    const rows=[]
    userorder && userorder.forEach((item,index)=>{
        rows.push({
            itemsQty:item.orderitem.length,
            id:item._id,
            status:item.orderstatus,
            amount:item.totalprice,
        })
    });

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearerror());
        };
        dispatch(myorder())
        


    },[alert,error,dispatch])


  return (
    <Fragment>
        <MetaData title="my Orders Page"/>
        {loading?(<Loader/>):(
            <div className="myOrderPage">
                <DataGrid 
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className="myOrdersTable"
                autoHeight
                 /> 
                  <Typography id="myOrdersHeading">{user.name}'s Orders </Typography>
            </div>

        )}
    </Fragment>
  )
}

export default Myorder




