import React, { useContext, useEffect, useState } from 'react'
import { storeContext } from '../Context'
import axios from "axios"
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import UpdateInput from './updateInput';


const allRecords = ({item}) => {
    const {setUpdate,formatDate,setId,userName,sortByStatus,setStatus,Letters,setLetters,newUpdateData,update,id,analysisDate,allRegistryRecords}= useContext(storeContext)
    const [updateAnalytics,setUpdateAnalytics]= useState({...item})
   
    const handleDelete = async (itemId)=>{
        try{
            confirmAlert({
                title: 'Confirm Delete',
                message: 'Are you sure you want to delete this record.',
                buttons: [
                  {
                    label: 'Yes',
                    onClick: async() => { const response = await axios.delete(`/delete-registry/${itemId}`).then(()=>{console.log("deleted successfully")}).catch((error)=>{console.log(error)})
                }
                  },
                  {
                    label: 'No',
                    onClick: () => {}
                  },
                ],
                closeOnEscape: true
              });
            

            
             
            // console.log(itemId)
            
        }catch(error){
            console.log(error)
        }
    }
    // const Letter_Number = ()=>{
    //     let sorted =[]
    //     if(sortByStatus){
    //         sorted = allRegistryRecords.filter((item)=>{return item.Letter_Status==sortByStatus})

    //     }
    //     return [sorted,sorted.length]
    
    // }
    const analyticsUpdate = (property,value)=>{
      
            if(!newUpdateData[property]){
                return value
            }
            else { 
                if(newUpdateData.id==item._id){
                return newUpdateData[property]
                }
            }


        
    }
    useEffect(()=>{
        async function runUpdate(){

            const response = await axios.get(`all-registry/${userName}`)
            setUpdateAnalytics((prev)=>{return {...prev,...newUpdateData}})
            console.log(updateAnalytics)
        }
        runUpdate()

    },[])
    
    
  return (
    <div> 

         {
            !update&&
                    (<>
                        <div className='flex justify-normal gap-4 font-light mt-6'>
                            <div className={userName=="admin"?'mr-[20px] w-[3%]':"ml-[30px] w-[5%]"}>{item?.Letter_Status}</div>
                            {/* <div className='border-r border-black'></div> */}
                            <div className={userName=="admin"?'text-left align-left ml-[37px] w-[5%]':"text-left align-left ml-[2px] w-[5%]"}>{formatDate(item?.Date_of_Letter)}</div>
                            {/* <div className='border-r border-black'></div> */}
                            <div className={userName=="admin"?'w-[5%] text-left align-left ml-[45px]':'w-[5%] text-left align-left ml-[60px]'}>{!item?.Date_of_Dispatch?"--":formatDate(item?.Date_of_Dispatch)}</div>
                            {/* <div className='border-r border-black'></div> */}
                            <div className={userName=="admin"?'w-[5%] align-left ml-[43px]':'w-[7%] align-left ml-[40px]'}>{!item?.Date_of_Receipt?"--":formatDate(item?.Date_of_Receipt)}</div>
                            {/* <div className='border-r border-black'></div> */}
                            <div className={userName=="admin"?'w-[3%] ml-[50px]':'w-[7%] ml-[1px]'}>{item?.Number_of_Letters}</div>
                            {/* <div className='border-r border-black'></div> */}
                            <div className={userName=="admin"?'w-[7%] ml-[56px]':'w-[5%] ml-[2px]'}>{item?.Registry_Number}</div>
                            {/* <div className='border-r border-black'></div> */}
                            <div className={userName=="admin"?'w-[5%] ml-[0px] absolute left-[49%]':'w-[5%] ml-[60px]'}>{item?.To_Whom}</div>
                            {/* <div className='border-r border-black'></div> */}
                            <div className={userName=="admin"?'w-[20%] ml-[20px] relative right-[35%] left-[8.7%] text-center':'w-[20%] ml-[30px] text-center'}>{item?.Subject}</div> 
                            {/* <div className='border-r border-black'></div> */}
                            <div className={userName=="admin"?'w-[15%] text-center ml-[2px] relative left-[8.5%]':'w-[15%] text-center ml-[2px]'}>{item?.Remarks}</div>
                            {userName=="admin" &&<div className='w-[7%] ml-[80px] text-center relative left-[1%] right-[4%]'>{item?.enteredBy}</div> }
                            {/* <div className='border-r border-black'></div>     */}
                            <div className='text-left'>
                                <div className='flex gap-3'>
                                    {/* <div className='text-green-500 cursor-pointer hover:text-white hover:bg-green-500' onClick={()=>{setUpdate(true),setId(item._id)}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                                        </svg>
                                    </div> */}
                                    <abbr title={analysisDate(item?.createdAt)} className='text-red-500'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                            <path d="M12 11.993a.75.75 0 0 0-.75.75v.006c0 .414.336.75.75.75h.006a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75H12ZM12 16.494a.75.75 0 0 0-.75.75v.005c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H12ZM8.999 17.244a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.006ZM7.499 16.494a.75.75 0 0 0-.75.75v.005c0 .414.336.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H7.5ZM13.499 14.997a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.005a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.005ZM14.25 16.494a.75.75 0 0 0-.75.75v.006c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75h-.005ZM15.75 14.995a.75.75 0 0 1 .75-.75h.005a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75H16.5a.75.75 0 0 1-.75-.75v-.006ZM13.498 12.743a.75.75 0 0 1 .75-.75h2.25a.75.75 0 1 1 0 1.5h-2.25a.75.75 0 0 1-.75-.75ZM6.748 14.993a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z" />
                                            <path fillRule="evenodd" d="M18 2.993a.75.75 0 0 0-1.5 0v1.5h-9V2.994a.75.75 0 1 0-1.5 0v1.497h-.752a3 3 0 0 0-3 3v11.252a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3V7.492a3 3 0 0 0-3-3H18V2.993ZM3.748 18.743v-7.5a1.5 1.5 0 0 1 1.5-1.5h13.5a1.5 1.5 0 0 1 1.5 1.5v7.5a1.5 1.5 0 0 1-1.5 1.5h-13.5a1.5 1.5 0 0 1-1.5-1.5Z" clipRule="evenodd" />
                                        </svg>
                                    </abbr>
                                    <abbr title={`minutes of letter: ${item?.minutes}   [${item?.filed=="no"?"Not filed":"Letter Filed"}]`}>
                                        <div className="text-green-500 hover:bg-green-500 hover:text-white rounded-lg">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                            <path fillRule="evenodd" d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </abbr>
                                       
                                </div>
                            </div>
                            

                            

                        </div>
                        
                    </>
                    
                )
                
                    
                }
                {
                    (update&&item._id==id)&&<UpdateInput key={item._id} items={item}/>

                    
                }
                                
        </div>
      
    
  )
}

export default allRecords
