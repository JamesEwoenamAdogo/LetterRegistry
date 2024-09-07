// import React from 'react'
// import { useContext } from 'react';
// import { storeContext } from '../Context';

// const analyse = () => {
// const {month, year,userName,analyse,setAnalyse,Letters,setLetters} = useContext(storeContext);

//   return (
//     <div>
//         <>
//                     <div className='flex justify-around pt-4'>
//                         <div className='font-semibold w-[15%]'>Month</div>
//                         <div className='font-semibold w-[15%]'>Year</div>
//                         <div className='font-semibold w-[15%]'>No_of_entries</div>
//                         <div className='font-semibold w-[15%]'>No. received Letters</div>
//                         <div className='font-semibold w-[15%]'>No. Disp. Letters</div>
//                         <div className='font-semibold w-[15%]'>Total</div>
//                         <div className='font-semibold w-[10%]'>View letters</div>
//                     </div>
//                     <div className='flex justify-around pt-4'>
//                         <div className='w-[15%]'>{month}</div>
//                         <div className='w-[15%]'>{year}</div>
//                         <div className='w-[15%]'>{JSON.parse(localStorage.getItem("analyse")).number_of_entries}</div>
//                         <div className='w-[15%]'>{`${JSON.parse(localStorage.getItem("analyse")).number_of_received}  [${JSON.parse(localStorage.getItem("analyse")).receivedLength} entries]`}</div>
//                         <div className='w-[15%]'>{`${JSON.parse(localStorage.getItem("analyse")).number_of_dispatched}  [${JSON.parse(localStorage.getItem("analyse")).dispatchLength} ${JSON.parse(localStorage.getItem("analysed")).dispatchLength==1?"entry":"entries"}]`}</div>
//                         <div className='w-[15%]'>{JSON.parse(localStorage.getItem("analyse")).total}</div>
//                         <div className='w-[10%] text-green-500 cursor-pointer hover:underline' onClick={()=>{setLetters(true)}}>
//                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
//                                 <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
//                             </svg>
//                         </div>
//                     </div>
//                 </>
      
//     </div>
//   )
// }

// export default analyse
