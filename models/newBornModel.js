import mongoose from "mongoose";
const { Schema, model } = mongoose;
import patientModel from "./patientModel.js";

const newBornSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    middle_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    patient_id: {
      type: Schema.Types.ObjectId,
      ref: "patients",
    },
  },
  {
    collection: "newBorn",
  }
);

newBornSchema.pre(["find", "findOne", "save", "create"],function ()  {
  this.populate([{ path: "patient_id", model: patientModel }]);
});

const NewBorn = model("newBorn", newBornSchema);

export default NewBorn;
