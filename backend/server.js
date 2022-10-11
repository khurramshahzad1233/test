const app=require("./app.js");
const dotenv=require("dotenv");
dotenv.config({path:"backend/config.env"});
const cloudinary=require("cloudinary")

process.on("uncaughtException",(err)=>{
  console.log(`Error:${err.message}`);
  console.log(`server is shurtting down due to uncaught exception`);
 process.exit(1)
})

const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.mongodb)
  
};

cloudinary.config({
  cloud_name:process.env.cloudinary_name,
  api_key:process.env.cloudinary_api_key,
  api_secret:process.env.cloudinary_api_secret,
})


const server=app.listen(process.env.port,()=>{
    console.log(`server is running on port ${process.env.port}`)
});

process.on("unhandledRejection",(err)=>{
  console.log(`Error=${err.message}`);
  console.log(`server is shutting down due to unhandled promise rejection`);
  server.close(()=>{
    process.exit(1)
  });
});