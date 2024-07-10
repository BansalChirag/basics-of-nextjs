"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import axios from 'axios';

const page = () => {
    
  const router = useRouter();
  const [user, setUser] = useState({
    email:"",
    password:""
  })

  const [loading, setLoading] = useState(false);


  const handleLogin = async()=>{
    try{
      setLoading(true);
      const response = await axios.post('/api/users/login',user);
      console.log(response.data)
      if(response.data.message==="Invalid Credentials"){
        alert("Invalid Credentials")
        return;
      }
      else if(response.data.message.includes("verify")){
        alert("Email verification Pending.")
        return;
      }
      alert("Login Successfull.")
      router.replace('/profile');
      
    }catch (error) {
      console.error('An error occurred while logging in', error);
      alert('An error occurred while logging in. see in console.')
    }finally{
      setLoading(false);
    }
    
  }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>{loading ? "Processing" : "Login"}</h1>
        <hr />
        <label htmlFor='email'>email</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id='email'
        type="email" placeholder='email' 
        value={user.email}
        onChange={(e)=>setUser({...user,email: e.target.value})}
        />
        <label htmlFor='password'>password</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id='password'
        type="text" placeholder='password' 
        value={user.password}
        onChange={(e)=>setUser({...user,password: e.target.value})}
        />
        <button
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        onClick={handleLogin}
        disabled={loading}
        >
            Login
        </button>
        <div className='flex gap-8 '>
            <Link href={'/signup'}>Signup?</Link>
            <Link href={'/forgot-password'}>forgot-password?</Link>
        </div>
    </div>
  )
}


export default page