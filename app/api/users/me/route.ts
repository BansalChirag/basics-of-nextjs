import User from "@/models/userModel";
import verifiedToken from "@/helpers/verifiedToken";
import { NextRequest, NextResponse } from "next/server";


export const GET = async(request: NextRequest) => {
  try{
    const userId = verifiedToken(request);
    
    const user = await User.findOne({_id:userId});

    return NextResponse.json({
      message: "User Found",
      data: user,
    });
    
  }catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
