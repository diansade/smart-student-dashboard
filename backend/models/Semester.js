const mongoose = require("mongoose");

const semesterSchema = new mongoose.Schema(
  {
    semester: {
      type: Number,
      required: true,
    },

    sgpa: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },

    credit: {
      type: Number,
      required: true,
      min: 1,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Semester = mongoose.model("Semester", semesterSchema);

module.exports = Semester;