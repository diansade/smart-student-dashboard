const Semester = require("../models/Semester");

const createSemester = async (req, res) => {
  try {
    const { semester, sgpa, credit } = req.body;

    const alreadyExists = await Semester.findOne({
      semester,
      user: req.userId,
    });

    if (alreadyExists) {
      return res.status(400).json({
        message: "Semester already exists",
      });
    }

    const newSemester = await Semester.create({
      semester,
      sgpa,
      credit,
      user: req.userId,
    });

    res.status(201).json({
      message: "Semester added successfully",
      semester: newSemester,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const getSemesters = async (req, res) => {
  try {
    const semesters = await Semester.find({
      user: req.userId,
    }).sort({ semester: 1 });

    res.status(200).json(semesters);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const deleteSemester = async (req, res) => {
  try {
    const { id } = req.params;

    const semester = await Semester.findOneAndDelete({
      _id: id,
      user: req.userId,
    });

    if (!semester) {
      return res.status(404).json({
        message: "Semester not found",
      });
    }

    res.status(200).json({
      message: "Semester deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  createSemester,
  getSemesters,
  deleteSemester,
};