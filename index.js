import express from "express";

const app = express();
app.use(express.json());
const tastkData = [
  {
    id: 1,
    title: "Task 1",
    completed: false,
  },
  {
    id: 2,
    title: "Task 2",
    completed: true,
  },
  {
    id: 3,
    title: "Task 3",
    completed: false,
  },
];

// testing
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Get all tasks
app.get("/tasks", (req, res) => {
  res.json(tastkData);
});

// Get a specific task by ID
app.get("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tastkData.find((t) => t.id === taskId);
  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});
// create a new task
app.post("/tasks", (req, res) => {
  const { title, completed } = req.body;
  const newTask = {
    id: tastkData.length + 1,
    title,
    completed,
  };
  tastkData.push(newTask);
  res.status(201).json(newTask);
});

// Update a task by ID
app.put("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tastkData.find((t) => t.id === taskId);
  if (task) {
    const { title, completed } = req.body;
    task.title = title !== undefined ? title : task.title;
    task.completed = completed !== undefined ? completed : task.completed;
    res.json(task);
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});
// Delete a task by ID
app.delete("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tastkData.findIndex((t) => t.id === taskId);
  if (taskIndex !== -1) {
    tastkData.splice(taskIndex, 1);
    res.json({ message: "Task deleted successfully" });
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
