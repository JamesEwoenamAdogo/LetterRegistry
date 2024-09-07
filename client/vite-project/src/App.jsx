import { useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import { Route,Routes } from 'react-router-dom'
import AddRecords from './Pages/AddRecords'
import AllRecords from './Pages/AllRecords'
import axios from "axios"
import UserContext from './Context'
import Login from './Pages/Login'
import Analytics from './Pages/analytics'
import AddUser from './Pages/addUser'
import Print from './Pages/Print'

function App() {
  axios.defaults.baseURL = "http://localhost:9000"
// 
  return (
    <div>
      <UserContext>
        <Sidebar />
        <Routes>
          <Route index element={<Login/>} />
          <Route path="/add-registry" element={<AddRecords/>}/>
          <Route path="/all-registry" element={<AllRecords/>}/>
          <Route path="/analytics" element= {<Analytics/>}/>
          <Route path="/add-user" element={<AddUser/>}/>
          <Route path='/print' element={<Print/>}/>
          
          
        </Routes>
      </UserContext>
        
    </div>
  )
}

export default App
