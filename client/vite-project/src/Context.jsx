// import { createContext } from "react"
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import React ,{createContext, useEffect, useRef, useState} from 'react'


export const storeContext = createContext(null)

const useContext = ({children}) => {
   const [allRegistryRecords,setallRegistryRecords] = useState([])
   const [token,setToken]= useState("")
   const [update, setUpdate]= useState(false)
   const[sortByStatus,setStatus]= useState("")
   const [id,setId]= useState("")
   const [searchText, setSearchText] = useState('')
   const [userName,setUsername]= useState("")
   const [Users, setAllUsers]= useState([])
   const [user, setUser]= useState("")
   const [month,setMonth]= useState("")
   const [year,setYear]= useState("")
   const [Letters,setLetters] = useState(false)
   const [newUpdateData,setNewUpdateData]= useState({})
   const [addUser,setAddUser]= useState(false)
   const [deleteUser,setDeleteUser] = useState(false)
   const[print,setPrint]= useState(false)
   const [printPage,setPrintPage]= useState([])
   const componentToPrint = useRef()


   
  //  let sorted = []

  //  if(sortByStatus){
  //   sorted = allRegistryRecords.filter((item)=>{return item.Letter_Status==sortByStatus })
  //   return sorted.length
  //  }

  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
  const [analyse, setAnalyse]= useState({number_of_entries:0,number_of_dispatched:0,number_of_received:0,total:0,receivedLength:0,dispatchLength:0})


   
   


   useEffect(()=>{
    async function fetchData(){
        try{
            // for(;;){
                
              
                
                const tokenStorage = localStorage.getItem("token")
                var user= jwtDecode(tokenStorage)
                setUsername(user.name)
                const response = await axios.get(`all-registry/${user.name}`)
                const allUsers = await axios.get("/all-users")
                // console.log(response.data.registry)
                setallRegistryRecords(response.data.registry)
                setAllUsers(allUsers.data.allUser)
                localStorage.setItem("users",JSON.stringify(allUsers.data.allUser))
                
                // console.log(Users)
                
            // }
            
            
            
            
            
            
        }catch(error){
            console.log(error)
        }

    }
    fetchData()


},[allRegistryRecords,update, setDeleteUser])


const formatDate = (rawdate)=>{
  const date = new Date(rawdate)
  const year = date.getFullYear()
  const month = String((date.getMonth()+1)).padStart(2,"0")
  const day=  String((date.getDate())).padStart(2,"0")
  // const hour = String(date.getMonth()+1).padStart(2,"0")
  // const minute = String(date.getMinutes()).padStart(2,"0")
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
 
  return !update?`${year}-${months[month-1]}-${day}`:`${year}-${month}-${day}`
  
 
  

}
const analysisDate = (rawdate)=>{
  const date = new Date(rawdate)
  const year = date.getFullYear()
  const month = String((date.getMonth()+1)).padStart(2,"0")
  const day=  String((date.getDate())).padStart(2,"0")
  const hour = String(date.getHours()).padStart(2,"0")
  const minute = String(date.getMinutes()).padStart(2,"0")
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  // console.log(hour)
  
  return `${day}-${months[month-1]}-${year} ${hour>12?hour%12:hour}:${minute}${hour>11?"PM":"AM"}`

  
  // return `${day}-${months[month-1]}-${year}`
  

}


const years = [];
for (let i = 2024; i <= 2090; i++) {
  years.push(i);
}






  const contextValues={
    allRegistryRecords,
    setToken,
    token,
    update,
    setUsername,
    userName,
    setUpdate,
    formatDate,
    setStatus,
    sortByStatus,
    id,
    setId,
    searchText,
    setSearchText,
    Users,
    user,
    setUser,
    month,
    setMonth,
    year,
    setYear,
    months,
    years,
    analyse,
    setAnalyse,
    Letters,
    setLetters,
    analysisDate,
    newUpdateData,
    setNewUpdateData,
    setAddUser,
    addUser,
    componentToPrint,
    setPrint,
    print,
    printPage,
    setPrintPage
  }


  return (
    <storeContext.Provider value={contextValues}>
        {children}
    </storeContext.Provider>
  )
}

export default useContext
