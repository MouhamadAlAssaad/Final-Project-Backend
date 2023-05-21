import express from "express";
import newBorn from "../controllers/newBornController.js";



const router =express.Router()

router.post('/addNewBorn' , newBorn.addNewBorn)
router.get('/',newBorn.getNewBorn)
router.get('/:id',newBorn.getNewBornByID)
router.delete('/:id' , newBorn.deleteNewBorn)
router.put('/:id',newBorn.updateNewBorn)


export default router;
