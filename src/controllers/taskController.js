const Task = require("../models/taskModel");

// Get all tasks
exports.getTasks = (req, res) => {
  Task.getAllTasks((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Get single task
exports.getTask = (req, res) => {
  Task.getTaskById(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0)
      return res.status(404).json({ message: "Task not found" });
    res.json(results[0]);
  });
};

// Create task
exports.createTask = (req, res) => {
  Task.createTask(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, ...req.body });
  });
};

// Update task
exports.updateTask = (req, res) => {
  Task.updateTask(req.params.id, req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Task updated successfully" });
  });
};

// Delete task
exports.deleteTask = (req, res) => {
  Task.deleteTask(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Task deleted successfully" });
  });
};
