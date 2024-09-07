import React, { useContext, useEffect, useState , useRef } from 'react'
import axios from 'axios'
import { storeContext } from '../Context'
import UpdateInput from '../components/updateInput'
import AllRegistryRecords from '../components/allRegistryRecords'
import { useReactToPrint } from 'react-to-print';
import Print from './Print'
import {Link}  from 'react-router-dom'



const AllRecords = () => {
    const {allRegistryRecords,update,sortByStatus,id,setPrintPage,componentToPrint,setUser,searchText,userName,user,setStatus,print,setPrint}= useContext(storeContext);
    setPrintPage(allRegistryRecords)
    
    // let sorted = []

    // if(sortByStatus){
    //     sorted = allRegistryRecords.filter((item)=>{return item.Letter_Status==sortByStatus })
    //     return sorted.length()
        
    // }
    // const componentToPrint = useRef()

    const handlePrint = useReactToPrint({
        content: ()=>componentToPrint.current
    })
    

 
    
   

   
  return (
    
    <div >
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
            {(userName=="admin") &&<div className='w-[7%] ml-[80px] text-center relative left-[1%] right-[4%] font-semibold'>enteredBy</div> }
            {/* <div className='border-r border-black'></div>     */}
            <div className='text-left font-semibold'>Action</div>
            


        </div>
        <div>

            
           {
            allRegistryRecords.map((item,key)=>{
               

               
                    if(!update){
                        if(!sortByStatus){
                            return (

                                <AllRegistryRecords  key={item._id} item={item}/>
                                
                              
                            )
                        }
                        else if(item.Letter_Status==sortByStatus)
                        {
                                return (<AllRegistryRecords  key={item._id} item={item}/>)

                            
                        }
                        
                        
                        
                        
                        
                        
                }else if(item._id==id){
                    

                    return (
                        <UpdateInput key={item._id} items={item}/>     
                    
                    )
                }
                


                
                
                                    
            })
           }
        </div>
        
        <Link to="/print">
            <div className='text-red-500 flex' >
            
                
                    <button className='bg-red-500 text-white rounded-lg w-[4%]' onClick={handlePrint}>PRINT</button>
                
            
            </div>
        </Link>
        
        
        
           
        
    </div>
  )
}

export default AllRecords
