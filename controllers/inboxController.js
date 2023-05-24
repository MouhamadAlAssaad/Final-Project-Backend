import Inbox from "../models/inboxModel.js"

export function addInbox(req, res, next) {
    try {
        let data = req.body
        let inboxData = new Inbox(data)
        inboxData.save()
        res.status(200).json({ response: inboxData })
    } catch (err) {
        res.status(500).json({ err })
    }
}




export async function getInbox(req, res, next) {
    try {
        const get = await Inbox.find({})
        res.status(200).json({ response: get })
    } catch (err) {
        res.status(400).json(err)
    }
}



 export async function getInboxById(req, res, next) {
    let id = req.params.id;
    try {
      const getById = await Inbox.findById({ _id: id });
      res.status(200).json({ response: getById });
    } catch (err) {
      res.status(400).json(err);
    }
  }

  export async function deleteInbox(req, res, next) {
    let id = req.params.id;
    try {
      const deletedMessage = await Inbox.findByIdAndDelete({ _id: id });
      if (deletedMessage) {
        res.status(200).json({ message: "Message deleted successfully" });
      } else {
        res.status(404).json({ message: "Message not found" });
      }
    } catch (err) {
      res.status(400).json(err);
    }
  }
  

export  function updateInbox(req,res,next){
    let id = req.params.id
    let data = req.body
    try{
         Inbox.updateOne({_id:id} , {$set:data})
        let response =  Inbox.findById({_id:id})
        res.status(200).json({message : "Updated successfully" , response })
    }catch(err){
        res.status(400).json(err)
    }
}


const inbox = { addInbox, getInboxById, deleteInbox, updateInbox ,getInbox}

export default inbox;