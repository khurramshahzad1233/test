const express=require("express");
const router=express.Router();
const { neworder, getsingleorder, myorder, getallorder, updateorderstatus, deleteorder } = require("../controller/ordercontroller.js");
const {authuser,authrole}=require("../middleware/authuser.js")

router.route("/order/new").post(authuser,neworder);
router.route("/order/me").get(authuser,myorder);
router.route("/order/:id").get(authuser,getsingleorder);
router.route("/admin/orders").get(authuser,authrole("admin"),getallorder);
router.route("/admin/order/:id").put(authuser,authrole("admin"),updateorderstatus).delete(authuser,authrole("admin"),deleteorder)


module.exports=router;