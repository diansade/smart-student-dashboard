const Task = require("../models/Task");

// Create a task
const createTask = async (req, res) => {
    try {
        const { taskName, taskSubject, priority } = req.body;

        const task = await Task.create({
            taskName,
            taskSubject,
            priority,
            user: req.userId
        });

        res.status(201).json({
            message: "Task created successfully",
            task
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// Get user's tasks
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({
            user: req.userId
        }).sort({ createdAt: -1 });

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// Update a task
const updateTask = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findOneAndUpdate(
            {
                _id: id,
                user: req.userId
            },
            req.body,
            {
                returnDocument: "after",
                runValidators: true 
            }
        );

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json({
            message: "Task updated successfully",
            task
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// Delete a task
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findOneAndDelete({
            _id: id,
            user:req.userId
        });

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json({
            message: "Task deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask
};