const Resource = require("../models/Resource");

const createResource = async (req, res) => {
  try {
    const { title, link } = req.body;

    const resource = await Resource.create({
      title,
      link,
      user: req.userId,
    });

    res.status(201).json({
      message: "Resource added successfully",
      resource,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const getResources = async (req, res) => {
  try {
    const resources = await Resource.find({
      user: req.userId,
    }).sort({ createdAt: -1 });

    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const deleteResource = async (req, res) => {
  try {
    const { id } = req.params;

    const resource = await Resource.findOneAndDelete({
      _id: id,
      user: req.userId,
    });

    if (!resource) {
      return res.status(404).json({
        message: "Resource not found",
      });
    }

    res.status(200).json({
      message: "Resource deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  createResource,
  getResources,
  deleteResource,
};