const db = require("../config/db"); // one folder up from models/

const Task = {};

// Get all tasks
Task.getAllTasks = (callback) => {
  const sql = "SELECT * FROM tasks ORDER BY id DESC";
  db.query(sql, callback);
};

// Get task by ID
Task.getTaskById = (id, callback) => {
  const sql = "SELECT * FROM tasks WHERE id = ?";
  db.query(sql, [id], callback);
};

// Create task
Task.createTask = (
  { title, description, due_date = null, done = false },
  callback
) => {
  const sql =
    "INSERT INTO tasks (title, description, due_date, done) VALUES (?, ?, ?, ?)";
  db.query(sql, [title, description, due_date, done], callback);
};

// Update task
Task.updateTask = (
  id,
  { title, description, due_date = null, done = false },
  callback
) => {
  const sql =
    "UPDATE tasks SET title = ?, description = ?, due_date = ?, done = ? WHERE id = ?";
  db.query(sql, [title, description, due_date, done, id], callback);
};

// Delete task
Task.deleteTask = (id, callback) => {
  const sql = "DELETE FROM tasks WHERE id = ?";
  db.query(sql, [id], callback);
};

module.exports = Task;
