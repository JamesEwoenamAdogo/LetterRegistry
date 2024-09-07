import mongoose from "mongoose"

const analyticSchema = new mongoose.Schema({
   
    Month:{
        type:String
    },
    Year:{
        type:String

    },
    number_of_entries:{
        type:Number
    },
    entry_id:{
        type:String
    },
    details:{
        type:Array,
        defaultValue:[]
    }
})

export const analyticsModel = mongoose.model("analytics",analyticSchema)