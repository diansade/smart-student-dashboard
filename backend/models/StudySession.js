const mongoose = require("mongoose");

const studySessionSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
      trim: true,
    },

    minutes: {
      type: Number,
      required: true,
      min: 1,
    },

    date: {
      type: Date,
      default: Date.now,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const StudySession = mongoose.model(
  "StudySession",
  studySessionSchema
);

module.exports = StudySession;