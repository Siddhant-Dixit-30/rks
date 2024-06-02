const mongoose = require("mongoose");

// Create Schema
const userDataSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    skills: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    performanceReview: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create Model
const userData = mongoose.model("UserData", userDataSchema);

module.exports = userData;
