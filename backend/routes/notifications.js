const express = require("express");
const router = express.Router();

// Mock data for notifications
const notifications = [
  { id: 1, title: "New Application", message: "You have a new job application.", date: new Date() },
  { id: 2, title: "Interview Deadline", message: "Upcoming interview deadline for candidate XYZ.", date: new Date() },
  { id: 3, title: "Task Update", message: "Task ABC has been updated.", date: new Date() }
];

// GET notifications
router.get("/", (req, res) => {
  res.status(200).json(notifications);
});

module.exports = router;
