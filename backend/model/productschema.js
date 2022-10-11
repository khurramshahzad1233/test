const mongoose=require("mongoose");
const kittySchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true, "plz enter product name"],
        trim:true
    },
    description:{
        type:String,
        required:[true, 'plz enter product description']
    },
    price:{
        type:Number,
        required:[true, 'plz enter price '],
        maxLength:[8,"price cannot exceed 8 character "]
    },
    ratings:{
        type:Number,
        default:0
    },
    image:[
        {
        
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }   

        }
    ],
    category:{
        type:String,
        required:[ true, "plz enter product category"],
    },
    stock:{
        type:Number,
        required:[true,'plz enter product stock'],
        maxLength:[4,"stock cannot exceed 4 character"],
        default:1
    },
    numofreviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"userdata",
                required:true,
            },
            name:{
                type:String,
                requied:true,
            },
            rating:{
                type:Number,
                required:true

            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"userdata",
        required:true,
    },
    createdat:{
        type:Date,
        default:Date.now
    }








  });

  const productdata = mongoose.model('product', kittySchema);

  module.exports=productdata;