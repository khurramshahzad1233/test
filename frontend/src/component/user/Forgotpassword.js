import React,{useState,useEffect,Fragment} from 'react'
import Loader from "../layout/Loader/Loader.js";
import {useDispatch,useSelector} from "react-redux";
import {useAlert} from "react-alert";
import "./Forgotpassword.css";
import MetaData from "../layout/MetaData.js";
import {MailOutline} from "@mui/icons-material";
import {clearerrors,forgotpassword} from "../../action/updateprofileaction.js";



const Forgotpassword = () => {
    const dispatch=useDispatch();
    const alert=useAlert();
    const {error,message,loading}=useSelector((state)=>state.forgotpasswordred);

    const [email,setEmail]=useState('');

    const forgotPasswordSubmit=(e)=>{
        e.preventDefault();

        const myForm=new FormData();
        myForm.set("email",email);
        dispatch(forgotpassword(myForm));

    };
    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearerrors());
        };
        if(message){
            alert.success(message);
        }
    },[dispatch,error,alert,message]);

  return (
    <Fragment>
        {loading?(<Loader/>):(
            <Fragment>
                <MetaData title="Forgot Password"/>
                <div className="forgotPasswordContainer">
                    <div className="forgotPasswordBox">
                        <h2 className="forgotPasswordHeading">Forgot Password</h2>
                        <form className='forgotPasswordForm'
                        onSubmit={forgotPasswordSubmit}
                        >
                            <div className="forgotPasswordEmail">
                                <MailOutline/>
                                <input type="email"
                                placeholder='Email'
                                required
                                name='email'
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                                />
                            
                            </div>

                            <input type="submit"
                            value="send"
                            className='forgotPasswordBtn'
                            />
                        </form>
                    </div>
                </div>
            </Fragment>
            
        )}
    </Fragment>
    
  )
}

export default Forgotpassword