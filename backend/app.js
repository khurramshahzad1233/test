const express=require("express");
const app=express();
const dotenv=require("dotenv")
const errormiddleware=require("./middleware/err.js")
const product=require("./route/productroute.js");
const user=require("./route/userroute.js")
const cookieParser=require("cookie-parser");
const order=require("./route/orderroute.js");
const payment=require("./route/paymentroute.js")

const bodyParser=require("body-parser");
const fileUpload=require("express-fileupload");
dotenv.config({path:"backend/config.env"});





app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload())


app.use("/api",product);
app.use("/api",user);
app.use("/api",order);
app.use("/api",payment);

app.use(errormiddleware)




module.exports=app;