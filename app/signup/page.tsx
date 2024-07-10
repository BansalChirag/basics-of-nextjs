"use client"
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const page = () => {
    const router = useRouter();

    const [user, setUser] = useState({
        username:"",
        email:"",
        password:"",
    })
    
    const [loading, setLoading] = useState(false);

    const handleSignup = async()=>{
        try{
            setLoading(true);
            const response = await axios.post('/api/users/signup',user);
            console.log(response)
            if(response.data.message.includes("already")){
                alert("email already in use.")
                return;
            }
            alert("Registered Successfully.")
            alert("An email has been sent to your registered email.Please verify your email before login.")
            router.replace('/login');
        }catch (error) {
        
            console.error('An error occurred while signup', error);
            alert('An error occurred while signup. see in console.')
        }finally {
            setLoading(false);
        }   
    }


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className='mb-5'>{loading ? "processing" : "Signup"}</h1>
            <hr />
            <label htmlFor='username'>username</label>
            <input 
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id='username'
            type="text" placeholder='username' 
            value={user.username}
            onChange={(e)=>setUser({...user,username: e.target.value})}
            />
            <label htmlFor='email'>email</label>
            <input 
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id='email'
            type="text" placeholder='email' 
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
            onClick={handleSignup}
            disabled={loading}
            >
            Signup
            </button>
            <Link href={'/login'}>Login?</Link>
        </div>
      )
    }

export default page