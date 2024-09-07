import React, { useContext, forwardRef } from 'react'
import { storeContext } from '../Context'
import axios from "axios"
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


const allRecords = ({item}) => {
    const {setUpdate,formatDate,setId,userName,componentToPrint,sortByStatus,allRegistryRecords,setStatus}= useContext(storeContext)
    
    const handleDelete = async (itemId)=>{
        try{
            confirmAlert({
                title: 'Confirm to Delete',
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
            

            
             
            console.log(itemId)
            
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
    
    
  return (
    <div >
        <div className='flex justify-normal gap-4 font-light mt-6'>
            <div className={userName=="admin"?'mr-[20px] w-[3%]':"ml-[30px] w-[5%]"}>{item.Letter_Status}</div>
            {/* <div className='border-r border-black'></div> */}
            <div className={userName=="admin"?'text-left align-left ml-[37px] w-[5%]':"text-left align-left ml-[2px] w-[5%]"}>{formatDate(item.Date_of_Letter)}</div>
            {/* <div className='border-r border-black'></div> */}
            <div className={userName=="admin"?'w-[5%] text-left align-left ml-[45px]':'w-[5%] text-left align-left ml-[60px]'}>{!item.Date_of_Dispatch?"--":formatDate(item.Date_of_Dispatch)}</div>
            {/* <div className='border-r border-black'></div> */}
            <div className={userName=="admin"?'w-[5%] align-left ml-[43px]':'w-[7%] align-left ml-[40px]'}>{!item.Date_of_Receipt?"--":formatDate(item.Date_of_Receipt)}</div>
            {/* <div className='border-r border-black'></div> */}
            <div className={userName=="admin"?'w-[3%] ml-[50px]':'w-[7%] ml-[1px]'}>{item.Number_of_Letters}</div>
            {/* <div className='border-r border-black'></div> */}
            <div className={userName=="admin"?'w-[7%] ml-[56px]':'w-[5%] ml-[2px]'}>{item.Registry_Number}</div>
            {/* <div className='border-r border-black'></div> */}
            <div className={userName=="admin"?'w-[5%] ml-[0px] absolute left-[49%]':'w-[5%] ml-[60px]'}>{item.To_Whom}</div>
            {/* <div className='border-r border-black'></div> */}
            <div className={userName=="admin"?'w-[20%] ml-[20px] relative right-[35%] left-[8.7%] text-center':'w-[20%] ml-[30px] text-center'}>{item.Subject}</div> 
            {/* <div className='border-r border-black'></div> */}
            <div className={userName=="admin"?'w-[15%] text-center ml-[2px] relative left-[8.5%]':'w-[15%] text-center ml-[2px]'}>{item.Remarks}</div>
            {userName=="admin" &&<div className='w-[7%] ml-[80px] text-center relative left-[1%] right-[4%]'>{item.enteredBy}</div> }
            {/* <div className='border-r border-black'></div>     */}
            <div className='text-left'>
                <div className='flex gap-1'>
                    <div className='text-red-500 cursor-pointer hover:text-white hover:bg-red-500' onClick={()=>{handleDelete(item._id)}}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                    </div>
                    <div className='text-green-500 cursor-pointer hover:text-white hover:bg-green-500' onClick={()=>{setUpdate(true),setId(item._id)}}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                        </svg>
                    </div>
                    <abbr title={`minutes of letter: ${item.minutes}   [${item.filed=="no"?"Not filed":"Letter Filed"}]`}>
                      <div className="text-green-500 hover:bg-green-500 hover:text-white rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                          <path fillRule="evenodd" d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </abbr>
                    
                                    
                </div>
            </div>
            


        </div>
        
       
                               
    </div>
      
    
  )
}

export default allRecords
