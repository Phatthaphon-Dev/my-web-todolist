const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

let todos = [
  { id: 1, name: 'Ananped Student' },
  { id: 2, name: 'David Beckham' },
  { id: 3, name: 'Lisa Blackpink' },
  { id: 4, name: 'Justin Bieber' },
  { id: 5, name: 'Organize Natachra' }
];

// ดึงข้อมูล todo ทั้งหมด
app.get('/todos', (req, res) => {
  res.json(todos);
});

// ดึงข้อมูล todo หนึ่งรายการตาม id
app.get('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id == req.params.id);
  if (!todo) return res.status(404).send('Todo ไม่พบ');
  res.json(todo);
});

// สร้าง todo ใหม่
app.post('/todos', (req, res) => {
  const newTodo = {
    id: todos.length ? todos[todos.length - 1].id + 1 : 1,
    name: req.body.name
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// อัปเดต todo ที่มีอยู่
app.put('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id == req.params.id);
  if (!todo) return res.status(404).send('Todo ไม่พบ');
  todo.name = req.body.name;
  res.json(todo);
});

// ลบ todo
app.delete('/todos/:id', (req, res) => {
  const todoIndex = todos.findIndex(t => t.id == req.params.id);
  if (todoIndex === -1) return res.status(404).send('Todo ไม่พบ');
  const deletedTodo = todos.splice(todoIndex, 1);
  res.json(deletedTodo);
});

app.listen(port, () => {
  console.log(`Todo API ฟังอยู่ที่ http://localhost:${port}`);
});
