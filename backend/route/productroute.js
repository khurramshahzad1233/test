const express=require("express");
const  {getallproduct,createproduct, updateproduct, deleteproduct, getproductdetail, createproductreview, getallproductreview, deletereview, getalladminproducts}  = require("../controller/productcontroller.js");

const {authuser,authrole}=require("../middleware/authuser.js")

const router=express.Router();

router.route("/product").get(getallproduct);
router.route("/admin/product/new").post(authuser,authrole("admin"),createproduct);
router.route("/admin/product/:id").put(authuser,authrole("admin"),updateproduct).delete(authuser,authrole("admin"),deleteproduct);
router.route("/product/:id").get(getproductdetail);

router.route("/review").put(authuser,createproductreview);

router.route("/reviews").get(getallproductreview).delete(authuser,deletereview);

router.route("/admin/products").get(authuser,authrole("admin"),getalladminproducts)

module.exports=router;