import Appointment from "../models/appointmentModel.js";


function AddAppointment (req ,res){
    try{
    const data = req.body
    const appointment = new Appointment(data)
    appointment.save()
    res.status(200).json({message:"Appointment created successfully" , appointment})
    }catch(err){
    res.status(404).json({err})
    }
}

export async function getAppoitment(req, res, next) {
    try {
        const get = await Appointment.find({})
        res.status(200).json({ response: get })
    } catch (err) {
        res.status(400).json(err)
    }
}

async function getAppoitmentByID (req ,res){
    let id = req.params.id
    try{
        const data = await Appointment.findById(id);
        res.status(200).json({data})
    }catch(err){
        res.status(404).json({err})
    }
}

async function deleteAppoitment (req,res){
    let id = req.params.id
    try{
        const data = await Appointment.findByIdAndDelete({_id:id})
        res.status(200).json({ message:"Appointment deleted successfully" })
    }catch(err){
        res.status(404).json({err})
    }
} 

async function UpdateAppoitment (req ,res){
    let id = req.params.id
    let body = req.body 
    try{
        const data = await Appointment.findByIdAndUpdate({_id:id},{$set:body})
        res.status(200).json({message:'Appointment Updated successfully' , data})
    }catch(err){
        res.status(404).json({err})
    }
}

const appointment = {AddAppointment,getAppoitment,getAppoitmentByID,deleteAppoitment,UpdateAppoitment}

export default appointment