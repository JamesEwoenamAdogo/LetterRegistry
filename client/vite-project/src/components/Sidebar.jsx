import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { storeContext } from '../Context'



const Sidebar = () => {
    const {user,token,setToken, setStatus, setUser,setSearchText,userName,setuserName,Users,months,setMonth,setYear,years,setLetters,Letters}= useContext(storeContext)
    const [analytics,setanalytics]= useState(false)
    const navigate = useNavigate()

    const handleLogout = ()=>{
        setToken("")
        console.log(token)
        localStorage.removeItem("token")
        navigate("/")
        // setShowLogout(false)
        console.log(token)
        setuserName("")
    
        
        
        
    }

    if(localStorage.getItem("token")){
        return (


            
            <div className='bg-red-500 w-full items-center'>
                    <div className="flex gap-4 justify-around items-center">
                        <Link to={!localStorage.getItem("token")?"/":"/add-registry"} onClick={()=>{setanalytics(false);setLetters(false);localStorage.removeItem("analytics")}}>
                            <div className=" flex gap-4 p-4 text-white hover:underline">  
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
                                </svg>
                                <h1 className='text-white font-extrabold'>ADD RECORDS</h1>
                            </div>  
                        </Link>
                        <Link to={!localStorage.getItem("token")?"/":"/all-registry"} onClick={()=>{setanalytics(false);setLetters(false);localStorage.removeItem("analytics")}}>
                            <div className="flex gap-4 p-4 text-white hover:underline"> 
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                    <path d="M2.273 5.625A4.483 4.483 0 0 1 5.25 4.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 3H5.25a3 3 0 0 0-2.977 2.625ZM2.273 8.625A4.483 4.483 0 0 1 5.25 7.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 6H5.25a3 3 0 0 0-2.977 2.625ZM5.25 9a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3v-6a3 3 0 0 0-3-3H15a.75.75 0 0 0-.75.75 2.25 2.25 0 0 1-4.5 0A.75.75 0 0 0 9 9H5.25Z" />
                                </svg>
                                <h1 className='text-white font-extrabold'>ALL RECORDS</h1>
                            
                            </div>
                        </Link>
                        {userName=="admin"&&
                                    <Link to={!localStorage.getItem("token")?"/":"/analytics"} onClick={()=>{setanalytics(true);localStorage.setItem("analytics","analyse")}}>
                                        <div className="flex gap-4 p-4 text-white hover:underline"> 
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
                                        </svg>

                                        <h1 className='text-white font-extrabold'>ANALYTICS</h1>
                                        
                                        </div>
                                    </Link>
                        }
                        {!localStorage.getItem("analytics")&&
                            <div>
                                
                                <div className='flex'>
                                    <select name="status" className='p-0 border border-black rounded-lg absolute top-[18px] left-[55%] h-[25px]' onChange={(e)=>{setStatus(e.target.value)}}>
                                            <option ></option>
                                            <option value="Received">Received</option>
                                            <option value="Dispatched">Dispatched</option>
                                    </select>
                                    
                                </div>
                            </div>
                        }
                        {localStorage.getItem("analytics")&&
                           <>
                                
                                <div>
                                
                                    <div className='flex'>
                                        <select name="status" className='p-0 border border-black rounded-lg absolute top-[18px] left-[55%] h-[25px]' onChange={(e)=>{setMonth(e.target.value)}}>
                                            <option></option>
                                            {
                                                months.map((item)=>{
                                                    return <option value={item}>{item}</option>
                                                })
                                            }
                                        </select>
                                        
                                    </div>
                                </div>
                                <div>
                                    
                                    <div className='flex'>
                                        <select name="status" className='p-0 border border-black rounded-lg absolute top-[18px] left-[65%] h-[25px]' onChange={(e)=>{setYear(e.target.value)}}>
                                            <option></option>
                                            
                                            {
                                                years.map((item)=>{
                                                    return <option value={item}>{item}</option>
                                                })
                                            }
                                        </select>
                                        
                                    </div>
                                </div>
                                
                        
                            </> 
                        }
                        <div className='text-white font-semibold text-center ml-40'>
                        </div>
                        <div className='flex gap-4 p-4 text-white hover:underline cursor-pointer' onClick={handleLogout}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6" onClick={handleLogout}>
                                <path fillRule="evenodd" d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6ZM5.78 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 0 0 1.06-1.06l-1.72-1.72H15a.75.75 0 0 0 0-1.5H4.06l1.72-1.72a.75.75 0 0 0 0-1.06Z" clipRule="evenodd" />
                            </svg>
                            {
                                
                            }
                            <h1 className='font-semibold cursor-pointer'>LOGOUT</h1>

                        </div>
                        

                    </div>
            </div>
  )


    }else{
        return <></>
    }

  
}

export default Sidebar
