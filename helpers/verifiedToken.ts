import { NextRequest } from "next/server"
import jwt from "jsonwebtoken";

const verifiedToken = (request: NextRequest) => {
  try{
    const token = request.cookies.get("token")?.value || '';
    const isVerified:any = jwt.verify(token,process.env.SECRET_TOKEN!);
    console.log("🚀 ~ verifiedToken ~ isVerified:", isVerified)
    
    return isVerified.id

  }catch (error: any) {
    throw new Error(error.message);
  }
}

export default verifiedToken