import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import { registry_Model } from "./model.js"
import cors from "cors"
import bcrypt from "bcryptjs"
import { loginModel } from "./login_Model.js"
import jwt from "jsonwebtoken"
import { analyticsModel } from "./analytics_Model.js"

dotenv.config()

const app = express();
const port = process.env.PORT

app.use(cors({
    origin:"https://letter-registry-7o28.vercel.app/"
}))
app.use(express.json())
app.listen(port ,()=>{
    console.log(`Server running at ${port}`)
})
mongoose.connect(process.env.MONGO_URL).then(()=>{console.log("Database connected")})
app.get("/test",(req,res)=>{res.send("Test Route")})

app.post("/add-registry",async(req,res)=>{
    try{
        const {enteredBy,Date_of_Dispatch,Date_of_Receipt,Number_of_Letters,Letter_Status,Date_of_Letter,Registry_Number,To_Whom,Subject,Remarks,minutes,filed}=req.body
        const newUser = new registry_Model({
            enteredBy,Date_of_Letter,Date_of_Receipt, Date_of_Dispatch, Number_of_Letters,Letter_Status,Registry_Number,To_Whom,Subject,Remarks,minutes,filed
        })
        const user = await newUser.save()
        const createdDate = new Date(user.createdAt)
        const months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
        const month = months[createdDate.getMonth()]
        const year = createdDate.getFullYear()
        const number_of_entries = user.Number_of_Letters

        const analyticsRecord = await analyticsModel.create({Month:month,Year:year,number_of_entries,entry_id:newUser._id,details:user})

        return res.status(200).json({message:"records added", success:true})
    }catch(error){

        return res.status(500).json({message:"error"})
    
    }

})
app.get("/all-registry/:enteredBy",async (req,res)=>{
    try{
        const {enteredBy} = req.params
        // console.log(enteredBy)
        if(enteredBy=="admin"){
            const registry = await registry_Model.find({})
            return res.status(200).json({registry})
        }
        const registry = await registry_Model.find({enteredBy})
        res.status(200).json({registry})
        // console.log(registry)


    }catch(error){
        res.status(500).json({message:"error"})
    }


})
app.use("/delete-registry/:userId", async (req,res)=>{
    try{
        const {userId}= req.params
        console.log(userId)
        await registry_Model.findByIdAndDelete(userId)
        const entry_id = userId
        const find = await analyticsModel.findOneAndDelete({entry_id:userId})
        console.log(find)
        res.status(200).json({message:"Success"})
        


    }catch(error){
        console.log(error)
    }
})


app.post("/sign-up",async(req,res)=>{
    try{
        const {name,password}= req.body
        const hashedPassoword = await bcrypt.hash(password,10)
        const newLogin = loginModel.create({
            name,password:hashedPassoword
        })
        res.json({message:"success"})

        



    }catch(error){
        console.log(error)
    }

    


})


app.post("/login",async(req,res)=>{
    try{
        const {name, password}= req.body
        const existing = await loginModel.findOne({name})
        if(!existing){
            return res.json({message:"User not existing" , success:"not existing"})
        }
        const comparePassword= await bcrypt.compare(password,existing.password)
        if(!comparePassword){
            return res.json({message:"Invalid password",success:"invalid"})
        }
        const token = await jwt.sign({name,id:existing._id},process.env.TOKEN_SECRET,{expiresIn:"30m"})
        return res.json({success:true,token})



    }catch(error){
        
    }
})

app.put("/update/:id", async(req,res)=>{
    try{
        const {id}=req.params
        const updatedData = req.body
        if(updatedData.Date_of_Receipt){
            updatedData.Date_of_Dispatch=""

        }
        else if(updatedData.Date_of_Dispatch){
            updatedData.Date_of_Receipt=""
        }
        console.log(updatedData)
        const updated = await registry_Model.findByIdAndUpdate(id,updatedData , {new:true})
        const analyticsUpdate = {details:[updated]}

        const details = await analyticsModel.findOneAndUpdate({entry_id:id},analyticsUpdate, {new:true})

        res.json({success:true,updated})

    }catch(error){
        console.log(error)
        res.status(500).json({message:"error"})
    }
    
})
app.get("/all-users", async(req,res)=>{
    try{
        const allUser = await loginModel.find({})
        return res.json({allUser})

    }catch(error){
        res.status(500).json()
        
    }
})

app.get("/sort-by-status",async(req,res)=>{
    try{
        


    }catch(error){
        console.log(error)
        res.status(500).json({message:"error"})
    }
})

app.get("/all/:month/:year",async(req,res)=>{
    try{
        const {month,year}= req.params
        const month_Year = await analyticsModel.find({Month:month,Year:year})
        return res.json({all_Letter:month_Year})

    }catch(error){
        console.log(error)

    }
})

app.delete("/delete/:id", async(req,res)=>{
    try{
        const {id}=req.params
        await loginModel.findByIdAndDelete(id)
        res.status(200).json({success:true})
        


    }catch(error){
        console.log(error)
    }

})
