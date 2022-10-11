const userdata=require("../model/userschema.js");
const Errorhandler=require("../utils/errorhandler.js");
const catchasyncerror=require("../middleware/catchasyncerror.js");
const sendtoken=require("../utils/jwttoken.js");
const sendEmail=require("../utils/sendEmail.js");
const crypto=require("crypto");
const productdata=require("../model/productschema.js")
const cloudinary=require("cloudinary");



exports.registeruser=catchasyncerror(async(req,res,next)=>{
    const myCloud=await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:"avatars",
        width:150,
        crop:"scale"
    })
    const{name,email,password}=req.body;
    const user=await userdata.create({
        name,email,password,
        avatar:{
            public_id:myCloud.public_id,
            url:myCloud.secure_url
        },
    });
    const token=user.getjwttoken();
    // 
    sendtoken(user,201,res)

});

exports.loginuser=catchasyncerror(async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email ||!password){
        return next(new Errorhandler("plz enter email and password",400))
    };
    const user=await userdata.findOne({email}).select("+password");

    if(!user){
        return next(new Errorhandler("invalid email or password", 401))
    };
    const matchpassword=await user.comparepassword(password);
    
    if(!matchpassword){
        return next(new Errorhandler("invalid email or password", 401))
    }
    // const token=user.getjwttoken();
    // res.status(200).json({
    //     success:true,
    //     token
    // })

    sendtoken(user,200,res)
});


exports.logout=catchasyncerror(async(req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    })


    res.status(200).json({
        success:true,
        message:"logged out"
    })
});

// req.protocol}://${req.get("host") and need to add /api these alladd in line 78
exports.forgotpassword=catchasyncerror(async(req,res,next)=>{
    const user=await userdata.findOne({email:req.body.email});
    if(!user){
        return next( new Errorhandler("user not found",404))
    };
    const resettoken=user.getresetpasswordtoken();
    await user.save({validateBeforeSave:false});
    const resetpasswordurl=`${process.env.frontend_url_forgotpassword}/password/reset/${resettoken}`;
    const message=`your password reset token is :- \n\n ${resetpasswordurl} \n\n if you are not requested this email then plz ignore it`;
    try {
        await sendEmail({
            email:user.email,
            subject:`password recovery`,
            message,

        });
        res.status(200).json({
            success:true,
            message:`email sent to ${user.email} successfully`
        })
    } catch (error) {
        user.resetpasswordtoken=undefined;
        user.resetpasswordexpire=undefined;
        await user.save({validateBeforeSave:false});
        return next(new Errorhandler(error.message,500))
        
    }
});


exports.resetpassword=catchasyncerror(async(req,res,next)=>{
    const resettoken=req.params.token
    const resetpasswordtoken=crypto.createHash("sha256").update(resettoken).digest("hex");

    const user=await userdata.findOne({
        resetpasswordtoken,
        resetpasswordexpire:{$gt:Date.now()},
    });

    if(!user){
        return next(new Errorhandler("reset password token is invalid or has been expired",400));
    }
    if(req.body.password!==req.body.confirmpassword){
        return next(new Errorhandler("password does not matched",400))
    }
    user.password=req.body.password;
    user.resetpasswordtoken=undefined;
    user.resetpasswordexpire=undefined;

    await user.save();

    sendtoken(user,200,res);

});


exports.getuserdetail=catchasyncerror(async(req,res,next)=>{
   
    const user=await userdata.findById(req.user.id);
    res.status(200).json({
        success:true,
        user,
    })
});


exports.updatepassword=catchasyncerror(async(req,res,next)=>{
    const user=await userdata.findById(req.user.id).select("+password");

    const matchpassword=await user.comparepassword(req.body.oldpassword);

    if(!matchpassword){
        return next(new Errorhandler("old password is incorrect",400))
    }

    if (req.body.newpassword!==req.body.confirmpassword){
        return next(new Errorhandler("password does not match",400))
    }
    user.password=req.body.newpassword;
    await user.save();

    sendtoken(user,200,res)
       


});

exports.updateprofile=catchasyncerror(async(req,res,next)=>{
    let newuserdata={
        name:req.body.name,
        email:req.body.email,
    };
    
    // if(req.body.avatar===""){
    //     let user=await userdata.findById(req.user.id);
    //     console.log(user)
    //     newuserdata.avatar={
    //         public_id:user.avatar.public_id,
    //         url:user.avatar.url,
            
    //     };
        
    // };
   
    if(req.body.avatar!==" "){
        let user=await userdata.findById(req.user.id);

        const imageId=user.avatar.public_id;

        await cloudinary.v2.uploader.destroy(imageId);

        const myCloud=await cloudinary.v2.uploader.upload(req.body.avatar,{
           folder:"avatars",
           width:150,
           crop:"scale",
        });
    
        newuserdata.avatar={
            public_id: myCloud.public_id,
            url:myCloud.secure_url,
        };
    };
    let user=await userdata.findByIdAndUpdate(req.user.id,newuserdata,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });
    res.status(200).json({
        success:true,

    });
});


// get all users by admin

exports.getalluser=catchasyncerror(async(req,res,next)=>{
    const users=await userdata.find();

    res.status(200).json({
        success:true,
        users
    })
})


// get user detail by admin

exports.getsingleuser=catchasyncerror(async(req,res,next)=>{
    const user=await userdata.findById(req.params.id);

    if(!user){
        return next(new Errorhandler(`user does not exit with id ${req.params.id}`))
    }

    res.status(200).json({
        success:true,
        user,
    })
});


// update userrole to admin
exports.updateuserrole=catchasyncerror(async(req,res,next)=>{
    const user=await userdata.findById(req.params.id);

    if(!user){
        return next(new Errorhandler(`user does not exit with id:${req.params.id}`,400))
    }
    const newuserdata={
        email:req.body.email,
        name:req.body.name,
        role:req.body.role,
    };
    await userdata.findByIdAndUpdate(req.params.id,newuserdata,{
        new:true,
        runValidators:true,
        userFindAndModify:false
    });
    
    
    res.status(200).json({
        success:true,
        user
    })
});

// delete user by admin

exports.deleteuser=catchasyncerror(async(req,res,next)=>{
    const user=await userdata.findById(req.params.id);

    if(!user){
        return next(new Errorhandler(`user does not exit with id:${req.params.id}`,400));
    }

    // remove image from cloudinary

    const imageId=user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);
    await user.remove();
    res.status(200).json({
        success:true,
        message:"user deleted successfully"
    })
});

