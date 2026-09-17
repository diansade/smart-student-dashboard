const express = require("express");

const {
  createSemester,
  getSemesters,
  deleteSemester,
} = require("../controllers/semesterController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createSemester);
router.get("/", authMiddleware, getSemesters);
router.delete("/:id", authMiddleware, deleteSemester);

module.exports = router;