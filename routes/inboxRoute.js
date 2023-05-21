import express from "express";
const router = express.Router();
import {
  getInbox,
  addInbox,
  getInboxById,
  updateInbox,
  deleteInbox,
} from "../controllers/inboxController.js";

router.get("/getall", getInbox);

router.get("/:id", getInboxById);

router.post("/", addInbox);

router.put("/:id", updateInbox);

router.delete("/:id", deleteInbox);

export default router;
