import NewBorn from "../models/newBornModel.js";
import patientModel from "../models/patientModel.js";

// ADD a NewBorn
async function addNewBorn(req, res) {
  try {
    const data = req.body;

    const patientId = await patientModel.findById(req.body.patient_id);

    if (!patientId)
      return res.status(404).json({ message: "Patient not found" });

    const newBorn = new NewBorn(data);
    newBorn.save();
    res.status(200).json({ message: "NewBorn create successfully", newBorn });
  } catch (err) {
    res.status(404).json({ err });
  }
}
// Get all the data of NewBorn
async function getNewBorn(req, res, next) {
  try {
    const get = await NewBorn.find({});
    res.status(200).json({ response: get });
  } catch (err) {
    res.status(400).json(err);
  }
}

// Get NewBorn By id
async function getNewBornByID(req, res, next) {
  let id = req.params.id;
  try {
    const getById = await NewBorn.findById({ _id: id });
    res.status(200).json({ response: getById });
  } catch (err) {
    res.status(400).json(err);
  }
}

// Delete NewBorn by id
async function deleteNewBorn(req, res, next) {
  let id = req.params.id;
  try {
    const deleteById = await NewBorn.findByIdAndDelete({ _id: id });
    res
      .status(200)
      .json({ message: "NewBorn delete success", response: deleteById });
  } catch (err) {
    res.status(400).json(err);
  }
}

// Update NewBorn By id
async function updateNewBorn(req, res, next) {
  let id = req.params.id;
  let data = req.body;
  try {
    await NewBorn.updateOne( {_id: id}, {$set: data});
    let response = await NewBorn.findById({ _id: id });
    res.status(200).json({ message: "Update sucss", response });
  } catch (err) {
    res.status(400).json(err);
  }
}
const newBorn = {
  addNewBorn,
  getNewBorn,
  getNewBornByID,
  deleteNewBorn,
  updateNewBorn,
};

export default newBorn;
