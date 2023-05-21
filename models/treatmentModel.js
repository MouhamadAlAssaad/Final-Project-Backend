import mongoose from "mongoose";
const { Schema, model } = mongoose;

const treatmentSchema = new Schema({
    name : {
        type:String,
    },
    type: {
        type:String,
    },
  
    
},{
    collection:'treatment'
})

const Treatment = model('treatment',treatmentSchema)

export default Treatment