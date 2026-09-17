const Goal = require("../models/Goal");

const createGoal = async (req, res) => {
  try {
    const { title, type, target } = req.body;

    const goal = await Goal.create({
      title,
      type,
      target,
      user: req.userId,
    });

    res.status(201).json({
      message: "Goal created successfully",
      goal,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({
      user: req.userId,
    }).sort({ createdAt: -1 });

    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const updateGoal = async (req, res) => {
  try {
    const { id } = req.params;

    const goal = await Goal.findOneAndUpdate(
      {
        _id: id,
        user: req.userId,
      },
      req.body,
      {
        returnDocument: "after",
        runValidators: true,
      }
    );

    if (!goal) {
      return res.status(404).json({
        message: "Goal not found",
      });
    }

    res.status(200).json({
      message: "Goal updated successfully",
      goal,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const deleteGoal = async (req, res) => {
  try {
    const { id } = req.params;

    const goal = await Goal.findOneAndDelete({
      _id: id,
      user: req.userId,
    });

    if (!goal) {
      return res.status(404).json({
        message: "Goal not found",
      });
    }

    res.status(200).json({
      message: "Goal deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  createGoal,
  getGoals,
  updateGoal,
  deleteGoal,
};