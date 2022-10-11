import React,{Fragment, useEffect} from 'react'
import "./ProductList.css"
import {DataGrid} from "@mui/x-data-grid"
import {useSelector,useDispatch} from "react-redux"
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { Button } from '@mui/material'
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
import { Edit,Delete } from '@mui/icons-material'
import { getallorder, clearerror, deleteorder } from '../../action/orderaction';
import { useNavigate } from 'react-router-dom'


const Orderlist = () => {
    const dispatch=useDispatch();
    const alert=useAlert();
    const navigate=useNavigate();

    const {allorder,error}=useSelector((state)=>state.allorderred);
    const {error:deleteError, isDeleted}=useSelector((state)=>state.deleteorderred);

    const deleteOrderHandler=(id)=>{
        dispatch(deleteorder(id));
    };




    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearerror());
        }
        if(deleteError){
            alert.error(deleteError);
            dispatch(clearerror())
        }
        if(isDeleted){
            alert.success("Order Deleted Successfully");
            navigate("/admin/orders");
            dispatch({type:"DELETE_ORDER_RESET"});
        }
        dispatch(getallorder());

    },[dispatch,alert,error,deleteError,navigate,isDeleted]);

    const columns=[
        {
            field:"id",
            headerName:"Order ID",
            minWidth:300,
            flex:1

        },
        {
            field:"status",
            headerName:"Status",
            minWith:150,
            flex:0.5,
            cellClassName:(params)=>{
                return (params.row.status)==="Delivered"?"greenColor":"redColor";
            },
        },{
            field:"itemQty",
            headerName:"Items Qty",
            type:"number",
            minWidth:150,
            flex:.4,
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
            flex:0.3,
            headerName:"Actions",
            minWidth:150,
            type:"number",
            sortable:false,
            renderCell:(params)=>{
                return(
                    <Fragment>
                        <Link to={`/admin/order/${(params.row.id)}`}><Edit/></Link>

                        <Button onClick={()=>deleteOrderHandler((params.row.id))}><Delete/></Button>
                    </Fragment>
                );
            },
        },
    ];
    const rows=[];
    allorder && allorder.forEach((item)=>{
        rows.push({
            id:item._id,
            itemQty:item.orderitem.length,
            amount:item.totalprice,
            status:item.orderstatus,
        });
    });


  return (
    <Fragment>
        <MetaData title={`ALL ORDERS -ADMIN`}/>
        <div className="dashboard">
            <Sidebar/>
            <div className="productListContainer">
                <h1 id="productListHeading">ALL ORDERS</h1>

                <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className='productListTable'
                autoHeight
                />
            </div>
        </div>
    </Fragment>
  );
};

export default Orderlist