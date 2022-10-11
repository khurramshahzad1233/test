import React, { Fragment ,useState} from 'react';
import "./Header.css"
import {SpeedDial,SpeedDialAction} from  "@material-ui/lab"
import {Dashboard,Person,ExitToApp,ListAlt,ShoppingCart} from "@mui/icons-material"
import {Backdrop} from "@material-ui/core"
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { logout } from '../../../action/useraction.js';
import { useDispatch,useSelector } from 'react-redux';

const Useroptions = ({user}) => {
    const dispatch=useDispatch()
    const {cartItems}=useSelector((state)=>state.cartred)

    const [open,setOpen]=useState(false);
    const navigate=useNavigate()
    const alert=useAlert()


    const options=[
        {icon: <ListAlt/>, name:"Orders",func:orders},
        {icon: <Person/>, name:"Profile", func:account},
        {icon:<ShoppingCart 
        style={{color:cartItems.length>0?"tomato":"unset"}}
        />, name:`Cart(${cartItems.length})`,func:cart},
        {icon:<ExitToApp/>, name:"Logout", func:logoutuser},
    ];

    if(user.role==="admin"){
        options.unshift({icon:<Dashboard/>, name:"Dashboard", func:dashboard})
    }


    function dashboard(){
        navigate("/admin/dashboard");

    }

    function orders(){
        navigate("/orders")
    }

    function account(){
        navigate("/account")
    };
    function cart(){
        navigate("/cart")
    }

    function logoutuser(){
        dispatch(logout());
        alert.success("logout successfully")
    }

  return (
    <Fragment>
        <Backdrop open={open} style={{zIndex:"10"}}/>
        <SpeedDial
        ariaLabel='SpeedDial tooltip example'
        onClose={()=>setOpen(false)}
        onOpen={()=>setOpen(true)}
        open={open}
        direction="down"
        className='speedDial'
        style={{zIndex:"11"}}
        icon={<img
         className='speedDialIcon'
         src={user.avatar.url?user.avatar.url:"/Profile.png"}
         alt="Profile"

        />
        }
        >
            {options.map((item)=>(
                <SpeedDialAction key={item.name} icon={item.icon} tooltipTitle={item.name} onClick={item.func}
                tooltipOpen={window.innerWidth<=600?true:false}/>

            ))}
            
        </SpeedDial>
    </Fragment>
  )
}

export default Useroptions