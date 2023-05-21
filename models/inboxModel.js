import mongoose from "mongoose";
const { Schema, model } = mongoose;
import bcrypt from "bcryptjs";
const inboxSchema = new Schema(
  {
    firstName: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    message: {
        type: String,
        required: true,
      },
  },
  {
    collection: "inbox",
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
      updatedAt: "updated_at", // and `updated_at` to store the last updated date
    },
    versionKey: false,
  }
);




const Inbox = model("Inbox", inboxSchema);
export default Inbox;
