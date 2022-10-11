import React,{Fragment,useState,useEffect} from 'react'
import "./Updatepassword.css";
import Loader from "../layout/Loader/Loader.js"
import {useDispatch,useSelector} from "react-redux";
import {useAlert} from "react-alert";
import Metadata from "../layout/MetaData.js"
import {updatepassword,clearerrors} from "../../action/updateprofileaction.js"
import {LockOpen,Lock,VpnKey} from "@mui/icons-material";
import {useNavigate} from "react-router-dom"


const Updatepassword = () => {
    const dispatch=useDispatch();
    const alert=useAlert();
    const navigate=useNavigate();

    const {error, isUpdated,loading}=useSelector((state)=>state.profilered);

    const[oldpassword,setOldpassword]=useState("");
    const[newpassword,setNewpassword]=useState("");
    const[confirmpassword,setConfirmpassword]=useState("");

    const updatePasswordSubmit=(e)=>{
        e.preventDefault();

        const myForm=new FormData();

        myForm.set("oldpassword",oldpassword);
        myForm.set("newpassword",newpassword);
        myForm.set("confirmpassword",confirmpassword);

        dispatch(updatepassword(myForm))
    }

    useEffect(()=>{
        if(error){
            alert.error(error)
            dispatch(clearerrors())
        };
        if(isUpdated){
            alert.success("Password Updated Successfully")
            navigate("/account");

            dispatch({type:"UPDATE_PASSWORD_RESET"})
        }

    },[error,navigate,dispatch,alert,isUpdated]);




  return (
    <Fragment>
        {loading?(<Loader/>):(
            <Fragment>
                <Metadata title="Change Password"/>
                <div className="updatePasswordContainer">
                    <div className="updatePasswordBox">
                        <h2 className="updatePasswordHeading">Update Profile</h2>
                        <form 
                        className='updatePasswordForm'
                        onSubmit={updatePasswordSubmit}
                        >
                            <div className="loginPassword">
                                <VpnKey/>
                                <input type="password"
                                placeholder='Old Password'
                                required
                                value={oldpassword}
                                onChange={(e)=>setOldpassword(e.target.value)}
                                />
                            </div>

                            <div className="loginPassword">
                                <LockOpen/>
                                <input type="password"
                                placeholder="New Password"
                                required
                                value={newpassword}
                                onChange={(e)=>setNewpassword(e.target.value)}

                                />
                            </div>

                            <div className="loginPassword">
                                <Lock/>
                                <input type="password" 
                                placeholder='Confirm Password'
                                required
                                value={confirmpassword}
                                onChange={(e)=>setConfirmpassword(e.target.value)}
                                
                                />
                            </div>
                            <input type="submit" 
                            value="Change"
                            className='updatePasswordBtn'
                            />

                        </form>
                    </div>
                </div>
            </Fragment>
        )}
    </Fragment>
  )
}

export default Updatepassword