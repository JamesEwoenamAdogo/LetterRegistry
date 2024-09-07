import mongoose from "mongoose";



const registry = new mongoose.Schema({

    enteredBy:{
        type:String
    },

    Letter_Status:{
        type:String,
    },

    Date_of_Letter:{
        type:Date
    },
    Date_of_Receipt:{
        type :Date,
        // defaultValue:" "
    },
    Date_of_Dispatch:{
        type:Date,
        // defaultValue:" "
    },
    Number_of_Letters:{
        type:Number

    },
    Registry_Number:{
        type:String
    
    },
    To_Whom:{
        type:String
    },
    Subject:{
        type:String
    },
    Remarks:{
        type:String
    },
    minutes:{
        type:String
    },
    filed:{
        type:String,
        defaultValue:"no"
        
    }
},{timestamps:true})

export const registry_Model = mongoose.model("registry",registry)