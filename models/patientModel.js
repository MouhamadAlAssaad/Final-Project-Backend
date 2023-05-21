import mongoose from "mongoose";

const patientSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      trim: true,
    },

    middle_name: {
      type: String,
      trim: true,
    },
    last_name: {
      type: String,
      trim: true,
    },

    age: {
      type: Number,
      unique: true,
      trim: true,
    },
    address: {
      type: String,
      unique: true,
      trim: true,
    },

    weight: {
      type: Number,
    },
    nationality: {
      type: String,
      trim: true,
    },
    mobile: {
      type: Number,
      trim: true,
    },

    blood_group: {
      type: String,
      trim: true,
    },
    pressure: {
      type: String,
      trim: true,
    },

    grosess: {
      type: String,
      trim: true,
    },

    push: {
      type: String,
      trim: true,
    },

    abortion: {
      type: String,
      trim: true,
    },

    which_kid: {
      type: Number,
      trim: true,
    },
    kids_alive: {
      type: Number,
      trim: true,
    },
    kids_dead: {
      type: Number,
      trim: true,
    },
    medical_issues: {
      type: String,
      trim: true,
    },
    surgical_issues: {
      type: String,
      trim: true,
    },
    hereditary_issues: {
      type: String,
      trim: true,
    },
    allergies: {
      type: String,
      trim: true,
    },
    ldp: {
      type: Date,
      trim: true,
    },
    delivery_due_date: {
      type: Date,
      trim: true,
    },
    treatment: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
      updatedAt: "updated_at", // and `updated_at` to store the last updated date
    },
  }
);


const Patient = mongoose.model("Patient", patientSchema);

export default Patient;
