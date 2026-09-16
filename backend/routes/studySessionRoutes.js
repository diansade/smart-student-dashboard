const express = require("express");

const {
  createSession,
  getSessions,
  deleteSession,
} = require("../controllers/studySessionController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createSession);
router.get("/", authMiddleware, getSessions);
router.delete("/:id", authMiddleware, deleteSession);

module.exports = router;