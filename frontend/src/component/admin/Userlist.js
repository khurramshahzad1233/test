import React,{Fragment,useEffect} from 'react'
import {DataGrid} from "@mui/x-data-grid";
import "./ProductList.css"
import {useSelector, useDispatch} from "react-redux"
import {Link, useNavigate} from "react-router-dom"
import {useAlert} from "react-alert"
import {Button} from "@material-ui/core"
import MetaData from "../layout/MetaData.js"
import Sidebar from "./Sidebar.js"
import {Edit,Delete} from "@mui/icons-material"
import { getalluser, clearerror,deleteuser } from '../../action/useraction';

const Userlist = () => {
    const dispatch=useDispatch();
    const alert=useAlert();
    const navigate=useNavigate();
    const {error,alluser}=useSelector((state)=>state.alluserred)
    const {error:deleteError, isDeleted,message}=useSelector((state)=>state.deleteuserred);

    const deleteUserHandler=(id)=>{
        dispatch(deleteuser(id));
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
            alert.success(message);
            navigate("/admin/users");
            dispatch({type:"DELETE_USER_RESET"})
        }
        dispatch(getalluser());
    },[dispatch,alert,error,deleteError,navigate,isDeleted,message]);

    const columns=[
        {
            field:"id",
            headerName:"User ID",
            minWidth:180,
            flex:0.8,
        },
        {
            field:"email",
            headerName:"Email",
            minWidth:150,
            flex:0.5,
        },
        {
            field:"name",
            headerName:"Name",
            minWidth:150,
            flex:0.5,
        },
        {
            field:"role",
            headerName:"Role",
            type:"number",
            minWidth:150,
            flex:0.3,
            cellClassName:(params)=>{
                return params.getValue(params.id,"role")==="admin"?"greenColor":"redColor";
            }

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
                        <Link to={`/admin/user/${params.getValue(params.id,"id")}`}><Edit/></Link>
                        <Button onClick={()=>deleteUserHandler(params.getValue(params.id,"id"))}><Delete/></Button>
                    </Fragment>
                );
            },
        },
    ];
    const rows=[];
    alluser && alluser.forEach((item)=>{
        rows.push({
            id:item._id,
            role:item.role,
            email:item.email,
            name:item.name,
        });
    });
  return (
    <Fragment>
        <MetaData title={`ALL USERS -ADMIN`}/>
        <div className="dashboard">
            <Sidebar/>
            <div className="productListContainer">
                <h1 id="productListHeading">ALL USERS</h1>
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

export default Userlist