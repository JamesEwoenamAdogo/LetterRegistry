import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { storeContext } from '../Context'
import { useNavigate } from 'react-router-dom'
import {jwtDecode} from "jwt-decode"

const Login = () => {
    const [loginData,setloginData]= useState({name:"", password:""})
    const [errorMessage, setErorMessage]= useState("")

    const {setToken,setUsername}= useContext(storeContext)
    const navigate = useNavigate()
    const handleOnChange= (e)=>{
        const {value,name} = e.target
        setloginData(prev=>{return {...prev,[name]:value}})
    }
    useEffect(()=>{
        console.log(loginData)

    },[loginData])


    const handleSubmit = async(e)=>{
        
        try{
            e.preventDefault()
            const response = await axios.post("/login",loginData)
            if(response.data.success==true){
                toast.success("Login Success")
                localStorage.setItem("token",response.data.token)
                const tokenStorage = localStorage.getItem("token")
                console.log(response)
                setToken(tokenStorage)
                const user = jwtDecode(tokenStorage)
                setUsername(user.name)
                navigate("/add-registry")
                setErorMessage("")
                
                
                
            }
            else if(response.data.success=="invalid" || response.data.success=="not existing"){
                console.log(response.data.message)
                setErorMessage(response.data.message)
                

            }


        }catch(error){
            console.log(error)
        }

    }
  return (
    <div className='flex text-center absolute top-[37%] left-[40%]'>
        <form onSubmit={(e)=>{handleSubmit(e)}}>
            <legend className='font-bold text-red-600 text-4xl'>LOGIN</legend>
            <div className='flex flex-col gap-1'>
                <input type="text" name="name" className='login-input w-[300px]' required onChange={(e)=>{handleOnChange(e)}} placeholder='name' value={loginData.name} />
                <input type="password" name="password" className='login-input w-[300px]' required onChange={(e)=>{handleOnChange(e)}} placeholder='password' value={loginData.password} />
                <p className='text-red-500 text-left'>{errorMessage}</p>
                <button type='submit' className='text-white bg-red-500 p-2 mt-5 rounded-lg font-semibold'>LOGIN</button>
            </div>

        </form>
      
    </div>
  )
}

export default Login
