import React, { useState ,useEffect, useContext} from 'react'
import { storeContext } from '../Context'
import { toast } from 'react-toastify'
import axios from "axios"

const updateInput = ({items}) => {
    const {setUpdate,formatDate,newUpdateData,setNewUpdateData}= useContext(storeContext)
    const[updateData,setUpdateData]= useState({...items})
    
    

    useEffect(()=>{
        console.log(updateData)
        console.log(items)
        console.log(newUpdateData)
    },[updateData])




    const handleOnChange=(e)=>{
        const {name,value}= e.target 
        setUpdateData((prev)=>{return {...prev,[name]:value}})
        console.log(updateData)
        
        setNewUpdateData((prev)=>{return {...prev,[name]:value}})

    }
    const handleSubmit = async(e)=>{
        e.preventDefault()
        const response = await axios.put(`/update/${items._id}`,newUpdateData)
        setNewUpdateData((prev)=>{return {...prev, id:items._id}})
        console.log(response)
        setUpdate(false)
        toast.success("updated successfully")
        

    }
    

  return (
    <div>
         <div className=' text-white font-semibold rounded-lg absolute left-[95%] top-30 w-[190px] flex' >
                                <button type='submit' className='text-white bg-green-500 rounded-sm'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                    </svg>
                                </button>
                                <div className='text-red-600 cursor-pointer' onClick={()=>{setUpdate(false)}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                </div>
                            </div>
        <form onSubmit={(e)=>{handleSubmit(e)}}>
                            <legend className='text-red-500 font-semibold text-center rounded-lg w-[10%] absolute right-[45%] top-[13] p-2 mb-[20px]'> UPDATE ENTRY </legend>
                            <div className='flex flex-col justify-around gap-4 mb-10'>
                                <div className='flex w-[20%] relative left-[39.8%] top-[5%]'>
                                    {/* <label className="p-1 mt-10 font-semibold relative self-center" htmlFor="option">Letter Status:</label> */}
                                    <select onChange={(e)=>{handleOnChange(e)}} name="Letter_Status" className='p-1 mt-10 border border-black rounded-lg self-center' id="option" value={updateData.Letter_Status} required>
                                        <option value="">Select Letter Status</option>
                                        <option value="Received">Received</option>    
                                        <option value="Dispatched">Dispatched</option>    
                                    </select>
                                </div>
                                
                                <label htmlFor="" className='font-semibold absolute left-[40%] top-[21%]'>Date of Letter</label>
                                {updateData.Letter_Status?<label className='font-semibold absolute left-[53%] top-[21%]'>{`Date of ${updateData.Letter_Status=="Received"?"receipt":"dispatch"}`}</label>:<></>}
                                
                                <div className='flex gap-[6%] relative left-[40%] top-[5%]'>
                                    
                                    <input onChange={(e)=>{handleOnChange(e)}} type="Date" className='date-input' name="Date_of_Letter" value={formatDate(updateData.Date_of_Letter)} required />
                                    
                                    {updateData.Letter_Status=="Received"&&<input onChange={(e)=>{handleOnChange(e)}} type="Date" className='date-input' name="Date_of_Receipt" value={formatDate(updateData.Date_of_Receipt)} required />}
                                    {updateData.Letter_Status=="Dispatched"&&<input onChange={(e)=>{handleOnChange(e)}} type="Date" className='date-input' name="Date_of_Dispatch" value={formatDate(updateData.Date_of_Dispatch)} required />}

                                </div>
                                <input onChange={(e)=>{handleOnChange(e)}} type="number" placeholder='Number of letters' name='Number_of_Letters' value={updateData.Number_of_Letters} />
                                <input onChange={(e)=>{handleOnChange(e)}} type="text" name="Registry_Number" placeholder='Registry Number' value={updateData.Registry_Number} required />
                                <input onChange={(e)=>{handleOnChange(e)}} type="text" name="To_Whom" placeholder='To Whom' value={updateData.To_Whom} required/>
                                <input onChange={(e)=>{handleOnChange(e)}} type="text" name="Subject"placeholder='Subject' value={updateData.Subject} required/>
                                <input onChange={(e)=>{handleOnChange(e)}} type="text" name="Remarks" placeholder='Remarks' value={updateData.Remarks} required/>
                                <input onChange={(e)=>{handleOnChange(e)}} type="text" name="minutes" placeholder='minutes on letter' value={updateData.minutes} required/>
                                <select onChange={(e)=>{handleOnChange(e)}} name="filed" value={updateData.filed} className='flex gap-[6%] relative left-[40%] top-[5%] w-[6%] border border-solid rounded-lg'>
                                    <option value="">Filed Status</option>
                                    <option value="no">No</option>
                                    <option value="yes">Yes</option>
                                </select>
                            </div>
                           
                        </form>
      
    </div>
  )
}

export default updateInput
