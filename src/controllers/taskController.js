const db = require("../config/db");

// Get all tasks
exports.getTasks = (req, res) => {
  db.query("SELECT * FROM tasks", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
};

// Get a single task by ID
exports.getTask = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM tasks WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(results[0]);
  });
};

// Create a new task
exports.createTask = (req, res) => {
  const { title, description, done } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  db.query(
    "INSERT INTO tasks (title, description, done) VALUES (?, ?, ?)",
    [title, description || "", done || false],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Database error" });
      }
      res.status(201).json({
        id: results.insertId,
        title,
        description: description || "",
        done: done || false,
      });
    }
  );
};

// Update a task
exports.updateTask = (req, res) => {
  const { id } = req.params;
  const { title, description, done } = req.body;

  db.query(
    "UPDATE tasks SET title = ?, description = ?, done = ? WHERE id = ?",
    [title, description, done, id],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Database error" });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Task not found" });
      }
      res.json({ id, title, description, done });
    }
  );
};

// Delete a task
exports.deleteTask = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM tasks WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({ message: "Task deleted" });
  });
};
