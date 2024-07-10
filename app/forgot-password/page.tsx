"use client"
import axios from 'axios'
import Link from 'next/link'
import React, { useState } from 'react'

const page = () => {
    const [user, setUser] = useState({email:""})
    const [loading, setLoading] = useState(false);

    const handleClick = async()=>{
      try{
        setLoading(true); 
        const response = await axios.post('/api/users/forgot-password',user);
        if(response.data.message.includes("not found")){
          alert("User with this email id not found")
          return;
        }
        alert("An email is sent to your registered email id for password recovery.Please check you mail")
      }catch (error) {
        console.error('An error occurred in forgot-password', error);
        alert('An error occurred in forgot-password. see in console.')
      }
      finally {
        setLoading(false);
      }   
    }
  return (
    <div className='flex flex-col justify-center items-center py-2 min-h-screen'>
        <h1 className='mb-5'>
            {loading ? "processing" : "Forgot Password?"}
        </h1>
        <hr />
        <label htmlFor='email' className='mb-5'>Enter Email to reset your password</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id='email'
        name="email"
        type="email" placeholder='Email' 
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <button
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        onClick={handleClick}
        disabled={loading}
        >
          Send reset link
        </button>
        <Link href={'/login'} >Login?</Link>
    </div>
  )
}

export default page