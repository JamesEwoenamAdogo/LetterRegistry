import axios from 'axios'
import React, { useContext } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { storeContext } from '../Context'

const addUser = () => {
    const [userData,setUserData]= useState({
        name:"",
        password:""
    })
    const{users,setDeleteUser}= useContext(storeContext)
    const [user,setUser]= useState(false)
    const handleOnChange=(e)=>{
        try{
            e.preventDefault()
            const {name,value} = e.target
            setUserData((prev)=>{return {...prev, [name]:value}})


        }catch(error){
            console.log(error)
        }
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
            const response = await axios.post("/sign-up",userData)
            console.log(response)
            if(response.data.message=="success"){
                toast.success("user added successfully")
            }


        }catch(error){
            console.log(error)


        }


    }
    const handleDelete=async (id)=>{
        try{
            const response = await axios.delete(`/delete/${id}`).then(()=>{
                console.log("deleted successfully"),setDeleteUser(true)
            }).catch((error)=>{console.log(error)})
            if(response.data.success){
                setDeleteUser(false)
            }

        }catch(error){
            console.log(error)
        }

    }
  return (
    
    
        <div className='absolute top-[45%] left-[45%]'>
            {
              !user?
                (<form onSubmit={handleSubmit}>
                    <div className='flex gap-2 flex-col'>
                        <input className="border border-black w-[300px]" type="text" placeholder='name of user' name="name" onChange={(e)=>{handleOnChange(e)}} value={userData.name} required />
                        <input className="border border-black w-[300px]" type="text" placeholder='assign password' name="password" value={userData.password} onChange={(e)=>{handleOnChange(e)}} required />
                        <button type='submit' className='bg-red-500 rounded-lg p-2 text-white font-semibold'>SUBMIT</button>
                        <button className='bg-green-500 rounded-lg p-2 text-white font-semibold' onClick={()=>{setUser(true)}}>SEE ALL USERS</button>
                        
                        
                    </div>




                </form>):<>
                    {
                        JSON.parse(localStorage.getItem("users")).map((item)=>{
                            return (
                                <div className='font-semibold] flex gap-10'>
                                    <div className='text-[20px]'>{item.name}</div>
                                    <div className='bg-red-500 mb-3 rounded-lg p-3 cursor-pointer' onClick={()=>handleDelete(item._id)}>Remove User</div>
                                    <hr />
                                </div>
                            )


                        })
                    }
                
                
                
                </>
            }
        
        </div>
    
  )
}

export default addUser
