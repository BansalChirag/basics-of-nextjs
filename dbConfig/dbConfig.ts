import mongoose from "mongoose";





export const connect = () => {
  try{
    mongoose.connect(process.env.MONGO_URL!);
    const conn = mongoose.connection;

    conn.on('connected',()=>{
        console.log("MongoDB connected successfully");
    })

    conn.on('error',()=>{
        console.log("MongoDB connection error.Please make sure MongoDB is running.")
        process.exit();
    })
  }catch(error){
    console.log("Something went wrong in db!");
    console.log(error);
  }
}
