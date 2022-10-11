import React,{Fragment,useEffect,useState} from 'react';
import MetaData from "../layout/MetaData.js"
import Loader from "../layout/Loader/Loader.js";
import {useAlert} from "react-alert";
import "./Resetpassword.css";
import {useDispatch,useSelector} from "react-redux";
import {LockOpen,Lock} from "@mui/icons-material";
import {clearerrors,resetpassword} from "../../action/updateprofileaction.js"
import {useNavigate,useParams} from "react-router-dom";

const Resetpassword = () => {
    const dispatch=useDispatch();
    const alert=useAlert();
    const {token}=useParams();
    const navigate=useNavigate()

    const{error,success,loading}=useSelector((state)=>state.forgotpasswordred)
    
    const [password,setPassword]=useState("");
    const [confirmpassword,setConfirmpassword]=useState("");
    const resetPasswordSubmit=(e)=>{
        e.preventDefault();

        const myForm=new FormData();
        myForm.set("password",password);
        myForm.set("confirmpassword",confirmpassword);
        dispatch(resetpassword(token,myForm));
    };

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearerrors())
        };
        if(success){
            alert.success("Password Update SuccessFully");
            navigate("/login");
        }

    },[dispatch,error,alert,navigate,success])
  return (
    <Fragment>
        {loading?(<Loader/>):(
            <Fragment>
                <MetaData title="Change Password"/>
                <div className="resetPasswordContainer">
                    <div className="resetPasswordBox">
                        <h2 className="resetPasswordHeading">Update Profile</h2>
                        <form className='resetPasswordForm'
                        onSubmit={resetPasswordSubmit}
                        >
                            <div>
                                <LockOpen/>
                                <input type="password"
                                placeholder='New Password'
                                required
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
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
                            value="Update"
                            className='resetPasswordBtn'
                            />
                        </form>
                    </div>
                </div>
            </Fragment>
        )}
    </Fragment>
    
  )
}

export default Resetpassword