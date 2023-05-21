import Patient from "../models/patientModel.js";

// add new Patient
export async function addPatient(req, res, next) {
  try {
    const data = req.body;
    const patientData = new Patient(data);
    const savedPatient = await patientData.save();
    res.status(200).json({ response: savedPatient });
  } catch (err) {
    res.status(500).json({ err });
  }
}

// GET all patients
export async function getAllPatients(req, res, next) {
  try {
    const get = await Patient.find({});
    res.status(200).json({ response: get });
  } catch (err) {
    res.status(400).json(err);
  }
}

// UPDATE patient by ID
// export async function updatePatientById(req, res, next) {
//   let id = req.params.id;
//   let data = req.body;
//   try {
//     await Patient.updateOne({ _id: id},{ $set: data });
//     let response = await Treatment.findById({ _id: id });
//     res.status(200).json({ message: "Update sucss", response });
//   } catch (err) {
//     res.status(400).json(err);
//   }
// }
export async function updatePatientById(req, res, next) {
  let id = req.params.id;
  let data = req.body;
  try {
    await Patient.updateOne({ _id: id},{ $set: data });
    let response = await Patient.findById({ _id: id });
    res.status(200).json({ message: "Update sucss", response });
  } catch (err) {
    res.status(400).json(err);
  }
}


// DELETE patient by ID
export const deletePatientById = async (req, res) => {
  const patient = await Patient.findByIdAndDelete(req.params.id);
  if (patient) {
    res.json({ message: "Patient removed" });
  } else {
    res.status(404);
    throw new Error("Patient not found");
  }
};

// GET patient by ID
export const getPatientById = async (req, res) => {
  const patient = await Patient.findById(req.params.id);
  if (patient) {
    res.json(patient);
  } else {
    res.status(404);
    throw new Error("Patient not found");
  }
};
