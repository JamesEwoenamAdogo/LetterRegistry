import React, { useContext, useEffect, useState } from 'react'
import { storeContext } from '../Context'
import axios from 'axios'
import AllRecords from '../components/allRegistryRecords copy'
import { Link } from 'react-router-dom'

const analytics = () => {
    const {month, year,userName,analyse,Letters,setLetters,update,setUpdate} = useContext(storeContext);
    const [viewLetters,setViewLetters]= useState([])
    
    


    function addLetterNumbers(LetterNumber){
        let numbers=0
        for(let num of LetterNumber){
            numbers+=num

        }
        return numbers
    }
    
    let letters=[]
    const allMonthYear = async()=>{
        let records={}
                if(month&&year){
                    const response = await axios.get(`/all/${month}/${year}`)
                    const number_of_entries = response.data.all_Letter.length
                    const dispatchEntry = response.data.all_Letter.filter((item)=>{return item.details[0].Letter_Status=="Dispatched"})
                    const receivedEntry = response.data.all_Letter.filter((item)=>{return item.details[0].Letter_Status=="Received"})
                    const receivedArray = receivedEntry.map((item)=>{return item.details[0].Number_of_Letters})
                    const dispatchedArray = dispatchEntry.map((item)=>{return item.details[0].Number_of_Letters})
                    const number_of_dispatched = addLetterNumbers(dispatchedArray)
                    const number_of_received = addLetterNumbers(receivedArray)
                    const total= number_of_dispatched+ number_of_received
                    const receivedLength = receivedEntry.length
                    const dispatchLength = dispatchEntry.length
                    
                    letters = response.data.all_Letter
                    console.log(letters)
                    // setAnalyse({...letters})
                    console.log(analyse)
                    records = {number_of_entries,number_of_dispatched,number_of_received,total,receivedLength,dispatchLength}
    
                    localStorage.setItem("analyse",JSON.stringify(records))
                    localStorage.setItem("month_records",JSON.stringify(letters))
                   
                   
                    
                    
    
                    
                }
                return records
                
            }
                
                
            useEffect(()=>{
                allMonthYear()
                    
            
                
                    
                    
                    


            },[month,year])
                
                
        


                
        
        
    
        
        

    


  return (     
        <>
                        {
                            !Letters?
                                   ( 
                                    <div className='flex justify-around pt-4'>
                                        <div className='font-semibold w-[15%]'>Month</div>
                                        <div className='font-semibold w-[15%]'>Year</div>
                                        <div className='font-semibold w-[15%]'>No_of_entries</div>
                                        <div className='font-semibold w-[15%]'>No. received Letters</div>
                                        <div className='font-semibold w-[15%]'>No. Disp. Letters</div>
                                        <div className='font-semibold w-[15%]'>Total</div>
                                        <div className='font-semibold w-[10%]'>View letters</div>
                                    </div>
                                   ):<>
                                            <div className='flex justify-normal gap-4 font-light mt-6'>
                                                <div className={userName=="admin"?'mr-[20px] w-[3%] font-semibold':"ml-[30px] w-[5%] font-semibold"}>Letter_Status</div>
                                                {/* <div className='border-r border-black'></div> */}
                                                <div className={userName=="admin"?'text-left align-left ml-[37px] w-[5%] font-semibold':"text-left align-left ml-[2px] w-[5%] font-semibold"}>Date_of_Letter</div>
                                                {/* <div className='border-r border-black'></div> */}
                                                <div className={userName=="admin"?'w-[5%] text-left align-left ml-[45px] font-semibold':'w-[5%] text-left align-left ml-[60px] font-semibold'}>Date_of_Dispatch</div>
                                                {/* <div className='border-r border-black'></div> */}
                                                <div className={userName=="admin"?'w-[5%] align-left ml-[43px] font-semibold':'w-[7%] align-left ml-[40px] font-semibold'}>Date_of_Receipt</div>
                                                {/* <div className='border-r border-black'></div> */}
                                                <div className={userName=="admin"?'w-[3%] ml-[50px] font-semibold':'w-[7%] ml-[1px] font-semibold'}>No._of_Letters</div>
                                                {/* <div className='border-r border-black'></div> */}
                                                <div className={userName=="admin"?'w-[7%] ml-[56px] font-semibold':'w-[5%] ml-[2px] font-semibold'}>Registry_Number</div>
                                                {/* <div className='border-r border-black'></div> */}
                                                <div className={userName=="admin"?'w-[5%] ml-[0px] absolute left-[49%] font-semibold':'w-[5%] ml-[60px] font-semibold'}>To_Whom</div>
                                                {/* <div className='border-r border-black'></div> */}
                                                <div className={userName=="admin"?'w-[20%] ml-[20px] relative right-[35%] left-[8.7%] text-center font-semibold':'w-[20%] ml-[30px] text-center font-semibold'}>Subject</div> 
                                                {/* <div className='border-r border-black'></div> */}
                                                <div className={userName=="admin"?'w-[15%] text-center ml-[2px] relative left-[8.5%] font-semibold':'w-[15%] text-center ml-[2px] font-semibold'}>Remarks</div>
                                                {userName=="admin" &&<div className='w-[7%] ml-[80px] text-center relative left-[1%] right-[4%] font-semibold'>enteredBy</div> }
                                                {/* <div className='border-r border-black'></div>     */}
                                                {/* <div className='text-left font-semibold'>Action</div> */}
                                                <div className='text-red-500 cursor-pointer hover:text-white hover:bg-red-500' onClick={()=>{setLetters(false)}}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                    </svg>
                                                </div>
                                                
                                            </div>
                           
                          
                       
                                   </>
                        }
          {
            (!Letters&&(month&&year))?(
            <div>
                
                            
                <div className='flex justify-around pt-4'>
                                <div className='w-[15%]'>{month}</div>
                                <div className='w-[15%]'>{year}</div>
                                <div className='w-[15%]'>{JSON.parse(localStorage.getItem("analyse"))?.number_of_entries}</div>
                                <div className='w-[15%]'>{`${JSON.parse(localStorage.getItem("analyse"))?.number_of_received}  [${JSON.parse(localStorage.getItem("analyse"))?.receivedLength} ${JSON.parse(localStorage.getItem("analyse"))?.receivedLength==1?"entry":"entries"}]`}</div>
                                <div className='w-[15%]'>{`${JSON.parse(localStorage.getItem("analyse"))?.number_of_dispatched}  [${JSON.parse(localStorage.getItem("analyse"))?.dispatchLength} ${JSON.parse(localStorage.getItem("analyse"))?.dispatchLength==1?"entry":"entries"}]`}</div>
                                <div className='w-[15%]'>{JSON.parse(localStorage.getItem("analyse"))?.total}</div>
                                <div className='w-[10%] text-green-500 cursor-pointer hover:underline' onClick={()=>{setLetters(true)}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
                                    </svg>
                                </div>
                            </div>
                
            </div>
            ):<></>
          }
            <div>
                {   
                    
                    JSON.parse(localStorage.getItem("month_records"))?.map((item)=>{

                        if(Letters){
                        return (<AllRecords item={item.details[0]}/>)
                        }
                    })
                }
                
            </div>
                
            {!Letters&&<Link to="/add-user">
                <button type='submit' className='text-white bg-red-500 p-2 mt-5 absolute left-[89%] top-[20%] rounded-lg font-semibold'>ADD NEW USER +</button>
            </Link>}




        </>  
  )
}

export default analytics
