import mongoose from "mongoose";

const loginSchema = new mongoose.Schema({
    name:{
        type:String
    },
    password:{

        type:String,

    }
})


export const loginModel = mongoose.model("login",loginSchema) 