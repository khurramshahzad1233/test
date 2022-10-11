const Errorhandler=require("../utils/errorhandler.js");
const catchasyncerror=require("../middleware/catchasyncerror.js");
const productdata=require("../model/productschema.js");
const userdata=require("../model/userschema.js");
const orderdata = require("../model/orderschema.js");


exports.neworder=catchasyncerror(async(req,res,next)=>{
    const {
        shippinginfo,
        orderitem,
        paymentinfo,
        itemprice,
        taxprice,
        shippingprice,
        totalprice,



    }=req.body;
    const order=await orderdata.create({
        shippinginfo,
        orderitem,
        paymentinfo,
        itemprice,
        taxprice,
        shippingprice,
        totalprice,
        paidat:Date.now(),
        user:req.user._id,

    });
    
    res.status(201).json({
        success:true,
        order,
    })
});


// get single order 
exports.getsingleorder=catchasyncerror(async(req,res,next)=>{
    const order=await orderdata.findById(req.params.id).populate(
        "user",
        "name email"
        
        );   

    if(!order){
        return next(new Errorhandler("order not found with this id", 404));
    };
    res.status(200).json({
        success:true,
        order,
    })
});


// get login single order;
exports.myorder=catchasyncerror(async(req,res,next)=>{
  
    const orders=await orderdata.find({user:req.user._id});
    
    
    
    res.status(200).json({
        success:true,
        orders,
    })
});


// get all order for admin only
exports.getallorder=catchasyncerror(async(req,res,next)=>{
    const orders=await orderdata.find();

    let totalamount=0;
    orders.forEach((order)=>{
        totalamount+= order.totalprice;
    })

    res.status(200).json({
        success:true,
        orders,
        totalamount,
    })
});

// export order status by admin

exports.updateorderstatus=catchasyncerror(async(req,res,next)=>{
    const order=await orderdata.findById(req.params.id);

    if(!order){
        return next(new Errorhandler("order not found with thid id",404))
    }

    if(order.orderstatus==="delivered"){
        return next(new Errorhandler("you have already delivered this order",400));
    };


   
    // reduce item quantity in stock after item delivered
    if(req.body.status==="shipped"){
    order.orderitem.forEach(async(ord)=>{
        await updatestock(ord.product,ord.quantity);
    });
}
    order.orderstatus=req.body.status;
    if(req.body.status==="delivered"){
        order.deliveredat=Date.now()
    }

    await order.save({ validateBeforeSave:false})

   res.status(200).json({
    success:true
   })
});

async function updatestock(id,quantity){
    const product=await productdata.findById(id);
    product.stock-=quantity;
    await product.save({validateBeforeSave:false});
}


// delete order by admin
exports.deleteorder=catchasyncerror(async(req,res,next)=>{
    const order=await orderdata.findById(req.params.id);

    if(!order){
        return next(new Errorhandler("order not found with this id", 404));
    }
    await order.remove();

    res.status(200).json({
        success:true,
    })
})