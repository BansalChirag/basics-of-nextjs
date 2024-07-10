import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server"
import bcrypt from 'bcryptjs';
import { connect } from "@/dbConfig/dbConfig";
import sendMail from "@/helpers/mailer";

connect();

export const POST = async (request:NextRequest) => {
  try{
    const reqBody = await request.json();
    const {username,email,password} = reqBody
    console.log(reqBody)
    const isUser = await User.findOne({email})
    if(isUser){
        return NextResponse.json({message : "User already exists"})
    }
    const hashedPassword = await bcrypt.hash(password,10);

    const newUser = new User({
        ...reqBody,
        password: hashedPassword
    })

    const savedUser = await newUser.save();
    
    // const token = await bcrypt.hash(savedUser._id.toString(),10)
    await sendMail({emailTo:email, emailType: "VERIFY", userId: savedUser._id}) 

    return NextResponse.json({
        message:"User registered Successfully.",
        success:true,
        status:200,
        savedUser,
    })

  }catch(err:any){
        return NextResponse.json({error:err.message})
    }
}
