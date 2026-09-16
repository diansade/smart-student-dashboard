const express = require("express");

const {
  createResource,
  getResources,
  deleteResource,
} = require("../controllers/resourceController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createResource);
router.get("/", authMiddleware, getResources);
router.delete("/:id", authMiddleware, deleteResource);

module.exports = router;