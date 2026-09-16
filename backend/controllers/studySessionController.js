const StudySession = require("../models/StudySession");

const createSession = async (req, res) => {
  try {
    const { subject, minutes, date } = req.body;

    const session = await StudySession.create({
      subject,
      minutes,
      date: date || new Date(),
      user: req.userId,
    });

    res.status(201).json({
      message: "Study session created successfully",
      session,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const getSessions = async (req, res) => {
  try {
    const sessions = await StudySession.find({
      user: req.userId,
    }).sort({ date: -1 });

    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const deleteSession = async (req, res) => {
  try {
    const { id } = req.params;

    const session = await StudySession.findOneAndDelete({
      _id: id,
      user: req.userId,
    });

    if (!session) {
      return res.status(404).json({
        message: "Study session not found",
      });
    }

    res.status(200).json({
      message: "Study session deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  createSession,
  getSessions,
  deleteSession,
};