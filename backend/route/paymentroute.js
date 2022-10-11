const express=require("express");
const { paymentprocess, sendstripeapikey} =require("../controller/paymentcontroller.js");
const { authuser } = require("../middleware/authuser.js");
const router=express.Router();


router.route("/payment/process").post(authuser,paymentprocess);

router.route("/stripeapikey").get(authuser,sendstripeapikey)



module.exports=router;