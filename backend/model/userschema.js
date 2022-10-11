const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const crypto=require("crypto");

const kittySchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"plz enter your name"],
        maxLength:[30,'name cannot exceed 30 characters'],
        minLength:[8,"name should have more then 8 characters"]
    },
    email:{
        type:String,
        required:[true,"plz enter your email"],
        unique:true,
        validate:[ validator.isEmail,"plz enter a valid email"],
    },
    password:{
        type:String,
        required:[true,"plz enter your password"],
        minLength:[8,"password should be more then 8 characters"],
        select:false,
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:"user",
    },
    createdAt:{
        type:Date,
        default:Date.now
    },

    resetpasswordtoken:String,
    resetpasswordexpire:Date,



  });
  kittySchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next()
    }

    this.password=await bcrypt.hash(this.password,10);
  });

  kittySchema.methods.getjwttoken=function () {
    return jwt.sign({id:this._id},process.env.jwt_secret_key,{
        expiresIn:process.env.jwt_expire,
    })
    };

    kittySchema.methods.comparepassword=async function (enterpassword) {
        return await  bcrypt.compare(enterpassword,this.password)
        
    };

    kittySchema.methods.getresetpasswordtoken=function(){
        const resettoken=crypto.randomBytes(20).toString("hex");
        this.resetpasswordtoken=crypto.createHash("sha256").update(resettoken).digest("hex");
        this.resetpasswordexpire=Date.now()+15*60*1000;
        return resettoken
    }

  const userdata = mongoose.model('user', kittySchema);



  module.exports=userdata;
