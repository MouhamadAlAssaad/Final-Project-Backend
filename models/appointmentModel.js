import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    date: {
      type: Date,
    },
  },
  {
    collection: "appointments",
  }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
