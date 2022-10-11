const Errorhandler=require("../utils/errorhandler.js")

module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode||500;
    err.message=err.message||"internal server error";


    if(err.name==="CastError"){
        const message=`resource not found, invalid:${err.path}`
        err=new Errorhandler(message,400)
    }

    // same email enter again on register account

    if(err.code===11000){
        const message=`duplicate ${Object.keys(err.keyValue)} entered`;
        err=new Errorhandler(message,400);
    }

    if(err.name==="jsonWebTokenError"){
        const message=`json web token is invalid, try again`;
        err=new Errorhandler(message,400)
    };

    if(err.name==="TokenExpiredError"){
        const message=`json web token is expired, try again`;
        err=new Errorhandler(message,400)
    }

    res.status(err.statusCode).json({
        success:false,
        message:err.message,
    })
}