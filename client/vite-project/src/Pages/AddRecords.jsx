import React, { useEffect, useState } from 'react'
import axios from "axios"
import { toast } from 'react-toastify'
import { jwtDecode } from 'jwt-decode'

const AddRecords = () => {
    const [registryData,setRegistryData]= useState({
        Letter_Status:"",
        Date_of_Letter:"",
        Date_of_Receipt:"",
        Date_of_Dispatch:"",
        Number_of_Letters:"",
        Registry_Number:"",
        To_Whom:"",
        Subject:"",
        Remarks:""
    
    })
    useEffect(()=>{


        console.log(registryData.Date_of_Dispatch,registryData.Date_of_Receipt)
        console.log(registryData)

    },[registryData])
    
    const handleOnChange=(e)=>{
        const {name,value}= e.target
        setRegistryData((prev)=>{return {...prev,[name]:value}})
        if(registryData.Letter_Status=="Dispatched"){
            setRegistryData((prev)=>{return {...prev, Date_of_Receipt:""}})
        }
        else if(registryData.Letter_Status=="Received"){
           setRegistryData((prev)=>{return {...prev, Date_of_Dispatch:""}})
        }
        
    }
    const LetterStatusState = async()=>{
        if(registryData.Letter_Status=="Received"){
            return `Date_of_Receipt`
        }
        else if(registryData.Letter_Status=="Dispatched"){
            return `Date_of_Dispatch`
        }
        
    }
   
    
    const handleSubmit = async (e)=>{
        try{
            e.preventDefault()
            registryData.enteredBy= jwtDecode(localStorage.getItem("token")).name
            const response = await axios.post("/add-registry",registryData)
            if(response.data.success){
                toast.success("Record added sucessfully",{toastId:"custom-Id"})
                setRegistryData({
                    enteredBy:"",
                    Letter_Status:"",
                    Date:"",
                    Date_of_Receipt:"",
                    Date_of_Dispatch:"",
                    Registry_Number:"",
                    Number_of_Letters:"",
                    To_Whom:"",
                    Subject:"",
                    Remarks:"",
                    minutes:"",
                    filed:"",
                
                })
                
                
            }



        }catch(error){
            console.log(error)
        }



    }
  return (
    <form onSubmit={handleSubmit}>
        <div className='flex flex-col justify-around gap-2 mb-10 '>
            <div className='flex w-[20%] relative left-[39.8%] top-[5%]'>
                {/* <label className="p-1 mt-10 font-semibold relative self-center" htmlFor="option">Letter Status:</label> */}
                <select onChange={(e)=>{handleOnChange(e)}} name="Letter_Status" className='p-1 mt-10 border border-black rounded-lg self-center' id="option" value={registryData.Letter_Status} required>
                    <option value="">Select Letter Status</option>
                    <option value="Received">Received</option>    
                    <option value="Dispatched">Dispatched</option>    
                </select>
            </div>
            
            <label htmlFor="" className='font-semibold absolute left-[40%] top-[16%]'>Date of Letter</label>
            {registryData.Letter_Status?<label className='font-semibold absolute left-[53%] top-[16%]'>{`Date of ${registryData.Letter_Status=="Received"?"receipt":"dispatch"}`}</label>:<></>}
            
            <div className='flex gap-[6%] relative left-[40%] top-[5%]'>
                
                <input onChange={(e)=>{handleOnChange(e)}} type="Date" className='date-input' name="Date_of_Letter" value={registryData.Date_of_Letter} required />
                
                {registryData.Letter_Status=="Received"&&<input onChange={(e)=>{handleOnChange(e)}} type="Date" className='date-input' name="Date_of_Receipt" value={registryData.Date_of_Receipt} required />}
                {registryData.Letter_Status=="Dispatched"&&<input onChange={(e)=>{handleOnChange(e)}} type="Date" className='date-input' name="Date_of_Dispatch" value={registryData.Date_of_Dispatch} required />}

            </div>
            <input onChange={(e)=>{handleOnChange(e)}} type="number" placeholder='Number of letters' name='Number_of_Letters' value={registryData.Number_of_Letters} />
            <input onChange={(e)=>{handleOnChange(e)}} type="text" name="Registry_Number" placeholder='Registry Number' value={registryData.Registry_Number} required />
            <input onChange={(e)=>{handleOnChange(e)}} type="text" name="To_Whom" placeholder='To Whom' value={registryData.To_Whom} required/>
            <input onChange={(e)=>{handleOnChange(e)}} type="text" name="Subject"placeholder='Subject' value={registryData.Subject} required/>
            <input onChange={(e)=>{handleOnChange(e)}} type="text" name="Remarks" placeholder='Remarks' value={registryData.Remarks} required/>
            <input onChange={(e)=>{handleOnChange(e)}} type="text" name="minutes" placeholder='minutes on letter' value={registryData.minutes} required/>
            <select onChange={(e)=>{handleOnChange(e)}} name="filed" value={registryData.filed} className='flex gap-[6%] relative left-[40%] top-[5%] w-[6%] border border-solid rounded-lg'>
                <option value="">Filed Status</option>
                <option value="no">No</option>
                <option value="yes">Yes</option>
            </select>
                
            
        </div>
        <button type="submit" className='bg-red-500 text-white p-3 font-semibold rounded-lg absolute left-[40%] top-30 w-[190px]'>ADD ENTRY</button>
    </form>
  )
}

export default AddRecords
