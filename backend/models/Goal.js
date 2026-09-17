const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["Weekly", "Monthly"],
      required: true,
    },

    target: {
      type: Number,
      required: true,
      min: 1,
    },

    progress: {
      type: Number,
      default: 0,
    },

    completed: {
      type: Boolean,
      default: false,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Goal = mongoose.model("Goal", goalSchema);

module.exports = Goal;