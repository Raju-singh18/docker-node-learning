
require("dotenv").config();

const express = require("express");

const app = express();

const PORT = process.env.PORT || 5000;
const APP_NAME = process.env.APP_NAME || "Node API";

app.use(express.json());

const notes = [
  {
    id: 1,
    title: "Learn Docker",
    content: "Understand images and containers"
  },
  {
    id: 2,
    title: "Learn Node.js",
    content: "Build REST APIs with Express"
  }
];

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Application is running",
    app: APP_NAME
  });
});

// Get all notes
app.get("/api/notes", (req, res) => {
  res.json({
    success: true,
    count: notes.length,
    notes
  });
});

// Create a note
app.post("/api/notes", (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      success: false,
      message: "Title and content are required"
    });
  }

  const newNote = {
    id: notes.length + 1,
    title,
    content
  };

  notes.push(newNote);

  res.status(201).json({
    success: true,
    note: newNote
  });
});

app.listen(PORT, () => {
  console.log(`${APP_NAME} running on port ${PORT}`);
});
