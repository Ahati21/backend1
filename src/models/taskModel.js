const db = require("../config/db");

// Get all tasks
exports.getAllTasks = (callback) => {
  db.query("SELECT * FROM tasks", callback);
};

// Get single task by ID
exports.getTaskById = (id, callback) => {
  db.query("SELECT * FROM tasks WHERE id = ?", [id], callback);
};

// Create new task
exports.createTask = (taskData, callback) => {
  const { title, description, due_date } = taskData;
  db.query(
    "INSERT INTO tasks (title, description, due_date) VALUES (?, ?, ?)",
    [title, description, due_date],
    callback
  );
};

// Update task
exports.updateTask = (id, taskData, callback) => {
  const { title, description, due_date } = taskData;
  db.query(
    "UPDATE tasks SET title=?, description=?, due_date=? WHERE id=?",
    [title, description, due_date, id],
    callback
  );
};

// Delete task
exports.deleteTask = (id, callback) => {
  db.query("DELETE FROM tasks WHERE id=?", [id], callback);
};
