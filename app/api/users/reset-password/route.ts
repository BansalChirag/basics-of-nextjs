import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs'



export async function POST(request: NextRequest){
    try{
        const {password,confirmPassword,token} = await request.json();
        console.log("token : " +   token)
        const user = await User.findOne({forgotPasswordToken:token, forgotPasswordTokenExpiry: {$gt:Date.now()}})
        console.log(user);
        
        if (!user) {
            return NextResponse.json({ message: "Invalid Token." });
        }

        if(password!==confirmPassword){
            return NextResponse.json({message:"Passwords don't match"});
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const isUpdated = await User.findByIdAndUpdate(user._id,{
            $set:{
                password: hashedPassword
            }
        })
        if(isUpdated){
            return NextResponse.json({message:"Password Successfully updated."});
        }else{
            return NextResponse.json({message:"Error in updating password. Please try after some time."});
        }

    }catch(error:any){
        return NextResponse.json({error:error.message},{status:500})
    }
}