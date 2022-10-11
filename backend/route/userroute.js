const express=require("express");
const { get } = require("mongoose");
const { registeruser, loginuser, logout, forgotpassword, resetpassword, getuserdetail, updatepassword, updateprofile, getalluser, getsingleuser, updateuserrole, deleteuser } = require("../controller/usercontroller.js");
const router=express.Router();
const {authuser, authrole}=require("../middleware/authuser.js")

router.route("/register").post(registeruser);
router.route("/login").post(loginuser);
router.route("/logout").get(logout);
router.route("/password/forgot").post(forgotpassword);
router.route("/password/reset/:token").put(resetpassword);
router.route("/me").get(authuser,getuserdetail);
router.route("/password/update").put(authuser,updatepassword);
router.route("/me/update").put(authuser,updateprofile);
router.route("/admin/user").get(authuser,authrole("admin"),getalluser);
router.route("/admin/user/:id").get(authuser,authrole('admin'),getsingleuser).put(authuser,authrole("admin"),updateuserrole).delete(authuser,authrole("admin"),deleteuser);




module.exports=router;