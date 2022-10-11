const productdata = require("../model/productschema.js");
const Errorhandler = require("../utils/errorhandler.js");
const cloudinary=require("cloudinary")
const catchasyncerror=require("../middleware/catchasyncerror.js")
const ApiFeatures=require("../utils/apifeature.js");
// exports.createproduct=catchasyncerror(async(req,res,next)=>{
//     req.body.user=req.user.id
//     const product=await productdata.create(req.body);
//     res.status(201).json({
//         success:true,
//         message:"new prduct created",
//         product
//     })

// });



exports.getallproduct=catchasyncerror( async(req,res,next)=>{
    const resultperpage=7;
    const productcount=await productdata.countDocuments()
    const apifeature=new ApiFeatures(productdata.find(),req.query)
    .search()
    .filter()
    .pagination(resultperpage)

    let product=await apifeature.query;
    let filteredProductsCount=product.length;
   

    
   
   
    res.status(200).json({
        success:true,
        product,
        productcount,
        resultperpage,
        filteredProductsCount,
    });
});


// for admin update product

exports.updateproduct=catchasyncerror( async(req,res,next)=>{
    let product=await productdata.findById(req.params.id);
    if(!product){
        return next(new Errorhandler("product not found",404))
    }


    // Images start here
    let images=[];
    if(typeof req.body.image==="string"){
        images.push(req.body.image);
    }else{
        images=req.body.image;
    }
    if(images!==undefined){
        for(let i=0; i<product.image.length; i++){
            await cloudinary.v2.uploader.destroy(product.image[i].public_id);

        }
        let imagesLinks=[];
        for(let i=0; i<images.length;i++){
            const result=await cloudinary.v2.uploader.upload(images[i],{
                folder:"products",
            });
            imagesLinks.push({
                public_id:result.public_id,
                url:result.secure_url,
            });
        }
        req.body.image=imagesLinks;
    }

        product=await productdata.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true,
            useFindAndModify:false
        }); 
        res.status(200).json({
        success:true,
        product
       })
    });


    // delete product admin

    exports.deleteproduct=catchasyncerror( async(req,res,next)=>{
        let product=await productdata.findById(req.params.id);
        if(!product){
           return next(new Errorhandler("Product not Found", 404));
        };

        // Deleting images from cloudinary/

        for(let i=0; i<product.image.length; i++){
            await cloudinary.v2.uploader.destroy(product.image[i].public_id);
        }
        await product.remove();
        res.status(200).json({
            success:true,
            message:"product has been removed"
        });
    });

    exports.getproductdetail=catchasyncerror( async(req,res,next)=>{
        let product=await productdata.findById(req.params.id);
        if(!product){
            return next(new Errorhandler(
                "product not found", 404
            ))
        };
        res.status(200).json({
            success:true,
            product
        })
    });


    //  create product review

exports.createproductreview=catchasyncerror(async(req,res,next)=>{
    const {rating,comment,productid}=req.body;
    const review={
        user:req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment,
    };
    const product=await productdata.findById(productid);
    const isreviewed=product.reviews.find((rev)=>rev.user.toString()===req.user._id.toString())
    
    if(isreviewed){
        product.reviews.forEach((rev)=>{
            if(rev.user.toString()===req.user._id.toString())
           ( rev.rating=rating),
           ( rev.comment=comment)
        })

    }
    else{
        product.reviews.push(review);
        product.numofreviews=product.reviews.length
    }

    let sum=0;
        product.reviews.forEach((rev)=>{
        sum+= rev.rating;
     })
     product.ratings=sum/product.reviews.length;

     await product.save({validateBeforeSave:false});
     res.status(200).json({
        success:true,
     })
    });

    // get all review of a single product

    exports.getallproductreview=catchasyncerror(async(req,res,next)=>{
        const product=await productdata.findById(req.query.id);

        if(!product){
            return next(new Errorhandler("product not found",404));
        }
        res.status(200).json({
            success:true,
            reviews:product.reviews,
        })
    });

    // delete review

    exports.deletereview=catchasyncerror(async(req,res,next)=>{
        const product=await productdata.findById(req.query.productId);

        if(!product){
            return next(new Errorhandler("product not found",404));
        }

        const reviews=product.reviews.filter((rev)=>rev._id.toString()!==req.query.id.toString());
        
       
        let sum=0;
        reviews.forEach((rev)=>{
            sum+= rev.rating
        });

        let ratings=0;
        if(reviews.length===0){
            ratings=0;
        }else{
            ratings=sum/reviews.length;
        }
        
        
        
        // ratings=sum/reviews.length;
        const numofreviews=reviews.length;

        await productdata.findByIdAndUpdate(req.query.productId,{
            reviews,
            ratings,
            numofreviews
        },{
            new:true,
            runValidators:true,
            useFindAndModify:false,
        })

        res.status(200).json({
            success:true,
        })
    });


    // get all product for admin///////////////////////////////////////////////////////////////
    exports.getalladminproducts=catchasyncerror(async(req,res,next)=>{
        const products=await productdata.find();

        res.status(200).json({
            success:true,
            products
        })
    });




    // create new product admin
    exports.createproduct=catchasyncerror(async(req,res,next)=>{
        let images=[];

        if(typeof req.body.image==="string"){
            images.push(req.body.image);
        }else{
            images=req.body.image;
        }
        const imagesLinks=[];

        for(i=0; i<images.length;i++){
            const result=await cloudinary.v2.uploader.upload(images[i],{
                folder:"products",
            });
            imagesLinks.push({
                public_id:result.public_id,
                url:result.secure_url,
            });
        }
        req.body.image=imagesLinks;
        req.body.user=req.user.id;
        const product=await productdata.create(req.body);
        res.status(201).json({
            success:true,
            message:"New Product Created",
            product,
        });
    })
