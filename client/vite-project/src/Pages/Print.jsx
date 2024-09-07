import React, { useContext } from 'react'
import { storeContext } from '../Context'
import {Link} from 'react-router-dom'
import { useReactToPrint } from 'react-to-print';

const Print = ({item}) => {
    const {componentToPrint,userName,formatDate,printPage,setPrintPage} = useContext(storeContext)
    console.log(printPage)


    const handlePrint = useReactToPrint({
        content: ()=>componentToPrint.current
    })
  return (
       <>
        <div ref={componentToPrint}>
            <div className='flex justify-normal gap-4 font-light mt-6'>
                <div className={userName=="admin"?'mr-[20px] w-[3%] font-semibold':"ml-[30px] w-[5%] font-semibold"}>Status</div>
                {/* <div className='border-r border-black'></div> */}
                <div className={userName=="admin"?'text-left align-left ml-[37px] w-[5%] font-semibold':"text-left align-left ml-[2px] w-[5%] font-semibold"}>DateLetter</div>
                {/* <div className='border-r border-black'></div> */}
                <div className={userName=="admin"?'w-[5%] text-left align-left ml-[45px] font-semibold':'w-[5%] text-left align-left ml-[60px] font-semibold'}>Disp.</div>
                {/* <div className='border-r border-black'></div> */}
                <div className={userName=="admin"?'w-[5%] align-left ml-[43px] font-semibold':'w-[7%] align-left ml-[40px] font-semibold'}>Rec.</div>
                {/* <div className='border-r border-black'></div> */}
                <div className={userName=="admin"?'w-[3%] ml-[50px] font-semibold':'w-[7%] ml-[1px] font-semibold'}>No</div>
                {/* <div className='border-r border-black'></div> */}
                {/* <div className={userName=="admin"?'w-[7%] ml-[56px] font-semibold':'w-[5%] ml-[2px] font-semibold'}>Reg. No.</div> */}
                {/* <div className='border-r border-black'></div> */}
                <div className={userName=="admin"?'w-[5%] ml-[0px] absolute left-[49%] font-semibold':'w-[5%] ml-[60px] font-semibold'}>To</div>
                {/* <div className='border-r border-black'></div> */}
                <div className={userName=="admin"?'w-[20%] ml-[20px] relative right-[35%] left-[8.7%] text-center font-semibold':'w-[17%] ml-[30px] text-center font-semibold'}>Subj.</div> 
                {/* <div className='border-r border-black'></div> */}
                {/* <div className={userName=="admin"?'w-[15%] text-center ml-[2px] relative left-[8.5%] font-semibold':'w-[15%] text-center ml-[2px] font-semibold'}>Remarks</div> */}
            </div>
            {
                printPage.map((item)=>{ 
                    return (
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
                    {/* <div className={userName=="admin"?'w-[7%] ml-[56px]':'w-[5%] ml-[2px]'}>{item?.Registry_Number}</div> */}
                    {/* <div className='border-r border-black'></div> */}
                    <div className={userName=="admin"?'w-[5%] ml-[0px] absolute left-[49%]':'w-[5%] ml-[60px]'}>{item?.To_Whom}</div>
                    {/* <div className='border-r border-black'></div> */}
                    <div className={userName=="admin"?'w-[20%] ml-[20px] relative right-[35%] left-[8.7%] text-center':'w-[17%] ml-[30px] text-center'}>{item?.Subject}</div> 
                    {/* <div className='border-r border-black'></div> */}
                    {/* <div className={userName=="admin"?'w-[15%] text-center ml-[2px] relative left-[8.5%]':'w-[15%] text-center ml-[2px]'}>{item?.Remarks}</div> */}
                </div>





                    
                )




                })
                
            }
            
            
            


        
        </div>
        <div className='text-red-500 flex' >
            
            <button className='bg-red-500 text-white rounded-lg w-[8%]' onClick={()=>{console.log(item);handlePrint()}}>PROCEED TO PRINT</button>
    
        </div>
    </>
    
  )
}

export default Print
