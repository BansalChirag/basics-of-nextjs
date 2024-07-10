import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
connect();

export const POST = async (request: NextRequest) => {
  try{

    const {email,password} = await request.json();
    const isUser =  await User.findOne({email});
    if(isUser){
        const isMatched = await bcrypt.compare(password,isUser.password);
        if(!isMatched){
            return NextResponse.json({message:"Invalid Credentials"})
          }
        if(!isUser.isVerified){
          return NextResponse.json({message:"Please verify your email first."})
        }
        const tokenData = {
            id: isUser._id,
            username: isUser.username,
            email: isUser.email
        }
        console.log(isUser._id)
        const token = await jwt.sign(tokenData,process.env.SECRET_TOKEN!,{expiresIn:"1d"});

        const response = NextResponse.json({
            message:"Login successful",
            success:true,
            token: token
        })

        response.cookies.set("token",token,{
            httpOnly:true
        })
        return response;
    }
    
    return NextResponse.json({message:"Invalid Credentials"})
  }catch(error:any){
    return NextResponse.json({error: error.message},{status:500})
  }
}
