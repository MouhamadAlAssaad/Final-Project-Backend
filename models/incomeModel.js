import mongoose from "mongoose";
const { Schema, model } = mongoose;

const incomeSchema = new Schema({
    description : {
        type:String,
        required:[true , "this field is required"]
    },
    amount: {
        type:Number,
        required:[true , "this field is required"]
    },
    date: {
        type:Date,
        required:[true , "this field is required"]
        
    },
    
},{
    collection:'income'
})

const Income = model('income',incomeSchema)

export default Income