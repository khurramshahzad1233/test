import React, {Fragment,useState,useEffect} from 'react'
import "./Updateprofile.css";
import Loader from "../layout/Loader/Loader.js"
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { clearerrors, updateprofile } from '../../action/updateprofileaction';
import { loaduser } from '../../action/useraction';
import { useAlert } from 'react-alert';
import {MailOutline,Face} from "@mui/icons-material";
import MetaData from "../layout/MetaData.js"


// import {UPDATE_PROFILE_RESET} from "../../reducer/updateprofilerreducer.js"



const Updateprofile = () => {
    const dispatch=useDispatch();
    const alert=useAlert();
    const navigate=useNavigate()
    const {user}=useSelector((state)=>state.userred);
    const {error,isUpdated,loading}=useSelector((state)=>state.profilered)

    const [name, setName]=useState("");
    const [email,setEmail]=useState("");

    const [avatar,setAvatar]=useState();
    const [avatarPreview,setAvatarPreview]=useState("/Profile.png");


    const updateprofileSubmit=(e)=>{
        e.preventDefault();

        const myForm=new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);
        dispatch(updateprofile(myForm));

    };

    const updateprofileDataChange=(e)=>{
       
            const reader=new FileReader();

            reader.onload=()=>{
                if(reader.readyState===2){
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        
    };

    useEffect(()=>{
        if(user){
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url)
        }
        if(error){
            alert.error(error);
            dispatch(clearerrors())
        }
        if(isUpdated){
            alert.success("Profile updated Successfully");
            dispatch(loaduser());
            navigate("/account");

            dispatch({
                type:"UPDATE_PROFILE_RESET"
            })
        }
    },[dispatch,error,alert,navigate,isUpdated,user]);
  return (
    <Fragment>
        {loading?(<Loader/>):(
            <Fragment>
            <MetaData title="Update Profile"/>
            <div className="updateProfileContainer">
                <div className="updateProfileBox">
                    <h2 className='updateProfileHeading'>Update Profile</h2>
                
    
                    <form className='updateProfileForm'
                
                encType="multipart/form-data"
                onSubmit={updateprofileSubmit}
                >
                    <div className="updateProfileName">
                        <Face/>
                        <input type="text"
                        placeholder='Name'
                        required
                        name="name"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        />
                    </div>
                    <div className='updateProfileEmail'>
                        <MailOutline/>
                        <input type="email"
                        placeholder='Email'
                        required
                        name='email'
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        />
    
    
                    </div>
                    
                    <div id="updateProfileImage">
                        <img src={avatarPreview} alt="Avatar Preview" />
                        <input type="file"
                        name='avatar'
                        accept='image/*'
                        onChange={updateprofileDataChange}
                        />
    
    
                    </div>
                    <input type="submit"
                    value="Update"
                    className='updateProfileBtn'
                    // disabled={loading?true:false}
                    />
    
                </form>
                </div>
            </div>
        </Fragment>
        )}
    </Fragment>
    
    

    
  )
}

export default Updateprofile