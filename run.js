// index.js

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mock data for initial todo list
let todoList = [
  { id: 1, title: 'Hit the gym' },
  { id: 2, title: 'David Beckham' },
  { id: 3, title: 'Lisa Blackpink' },
  { id: 4, title: 'Justin Bieber' },
  { id: 5, title: 'Organize Natachra' }
];

// Routes
// Get all todos
app.get('/api/todos', (req, res) => {
  res.json(todoList);
});

// Get a todo by id
app.get('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todoList.find(todo => todo.id === id);
  if (!todo) {
    res.status(404).send('Todo not found');
  } else {
    res.json(todo);
  }
});

// Create a new todo
app.post('/api/todos', (req, res) => {
  const newTodo = {
    id: todoList.length + 1,
    title: req.body.title
  };
  todoList.push(newTodo);
  res.json(newTodo);
});

// Update a todo by id
app.put('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todoToUpdate = todoList.find(todo => todo.id === id);
  if (!todoToUpdate) {
    res.status(404).send('Todo not found');
  } else {
    todoToUpdate.title = req.body.title;
    res.json(todoToUpdate);
  }
});

// Delete a todo by id
app.delete('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todoList.findIndex(todo => todo.id === id);
  if (todoIndex === -1) {
    res.status(404).send('Todo not found');
  } else {
    todoList.splice(todoIndex, 1);
    res.send('Todo deleted successfully');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

