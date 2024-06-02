const express = require("express");
const router = express.Router();
const userData = require("../models/userDataModel");

//CREATE
router.post("/", async (req, res) => {
  console.log(req.body);
  const { fname, department, skills, experience, performanceReview } = req.body;
  try {
    const userAdded = await userData.create({
      name: fname,
      department: department,
      skills: skills,
      experience: experience,
      performanceReview: performanceReview,
    });
    res.status(201).json(userAdded);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

//GET
router.get("/", async (req, res) => {
  try {
    const allUsers = await userData.find();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//GET SINGLE USER
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const singleUser = await userData.findById({ _id: id });
    res.status(200).json(singleUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await userData.findByIdAndDelete({ _id: id });
    res.status(201).json(deletedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});





module.exports = router;
