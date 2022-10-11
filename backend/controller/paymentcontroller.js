// const Stripe = require('stripe');
// const stripe = Stripe(process.env.SECRET_KEY);
const dotenv=require("dotenv");
const catchasyncerror=require("../middleware/catchasyncerror.js")
dotenv.config({path:"backend/config.env"});
const stripe=require("stripe")(process.env.SECRET_KEY);




exports.paymentprocess=catchasyncerror(async(req,res,next)=>{
  const mypayment=await stripe.paymentIntents.create({
    amount:req.body.amount,
    currency:"usd",
    metadata:{
      company:"Ecommerce",
    },

  });
  res.status(200).json({
    success:true,
    client_secret:mypayment.client_secret
  
  });

});
  exports.sendstripeapikey=catchasyncerror(async(req,res,next)=>{
    res.status(200).json({stripeapikey:process.env.PUBLISHABLE_KEY });

   
  });


 



    // const line_items=req.body.cartItems.map((item)=>{
    //     return{
    //         price_data:{
    //             currency:"usd",
    //             product_data:{
    //                 name:item.name,
    //                 images:[
    //                     item.image
    //                 ],
    //                 // description:item.description,
    //                 metadata:{
    //                     id:item.product
    //                 }
    //             },
    //             unit_amount:item.price*100,
    //         },
    //         quantity:item.quantity,
            
    //     }
        


   


//     const session=await stripe.checkout.sessions.create({
//         payment_method_types:["card"],
//         mode:"payment",


//         shipping_options: [
//             {
//               shipping_rate_data: {
//                 type: 'fixed_amount',
//                 fixed_amount: {
//                   amount: 0,
//                   currency: 'usd',
//                 },
//                 display_name: 'Free shipping',
//                 // Delivers between 5-7 business days
//                 delivery_estimate: {
//                   minimum: {
//                     unit: 'business_day',
//                     value: 5,
//                   },
//                   maximum: {
//                     unit: 'business_day',
//                     value: 7,
//                   },
//                 }
//               }
//             },
//             {
//               shipping_rate_data: {
//                 type: 'fixed_amount',
//                 fixed_amount: {
//                   amount: 1500,
//                   currency: 'usd',
//                 },
//                 display_name: 'Next day air',
//                 // Delivers in exactly 1 business day
//                 delivery_estimate: {
//                   minimum: {
//                     unit: 'business_day',
//                     value: 1,
//                   },
//                   maximum: {
//                     unit: 'business_day',
//                     value: 1,
//                   },
//                 }
//               }
//             },
//           ],

          
//         line_items,
//         phone_number_collection:{enabled:true},
//         shipping_address_collection:{
//             allowed_countries:["US"],
//         },
//        success_url:`${process.env.CLIENT_URL}/checkout-success`,
//        cancel_url: `${process.env.CLIENT_URL}/cart`,
        
//     });
//     res.status(200).json({url:session.url});
// });

