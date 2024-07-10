import { connect } from '@/dbConfig/dbConfig';
import sendMail from '@/helpers/mailer';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server'

connect()

export const POST = async (request: NextRequest) => {
  try{
    const {email} = await request.json();
    
    const isUser = await User.findOne({email});
    
    if(!isUser){
        return NextResponse.json({message:"User with this email id not found"})
    }
    await sendMail({emailTo:email, emailType: "RESET", userId: isUser._id})
    return NextResponse.json({message:"An email is sent to your registered email id for password recovery.Please check you mail"});
  }catch(err:any){
    return NextResponse.json({error: err.message},{status:500})
  }
}

