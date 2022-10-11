const Errorhandler = require("../utils/errorhandler.js");
const catchasyncerror = require("./catchasyncerror.js");
const jwt=require("jsonwebtoken");
const userdata = require("../model/userschema");

exports.authuser=catchasyncerror(async(req,res,next)=>{
    const {token}=req.cookies;
    if(!token){
        return next(new Errorhandler("plz login to access the resource",401))
    };
    const accessdata=jwt.verify(token,process.env.jwt_secret_key);
    req.user=await userdata.findById(accessdata.id);
 
    next()

});
exports.authrole=(...roles)=>{
    return(req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(
            new Errorhandler(`role:${req.user.role} is not allowed to access the resource`,403))
        };
        next();
    }
}
