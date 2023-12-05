const colors = require('colors');
const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');

const { json } = require('body-parser');
const { nanoid } = require('nanoid');

dotenv.config({ path: './config.env' });

const app = express();

app.use(cors());
app.use(json());

const todos = [
	{ id: nanoid(), title: 'dormir antes das 22h', completed: false },
	{ id: nanoid(), title: 'alimentar cão', completed: true },
	{ id: nanoid(), title: 'passear cão', completed: true },
	{ id: nanoid(), title: 'estudar', completed: true },
	{ id: nanoid(), title: 'fazer desafio de código', completed: false },
];

app.get('/todos', (req, res) => res.send(todos));

app.post('/todos', (req, res) => {
	const todo = { title: req.body.title, id: nanoid(), completed: false };
	todos.push(todo);

	return res.send(todo);
});

app.patch('/todos/:id', (req, res) => {
	const { id } = req.params;
	const index = todos.findIndex((todo) => todo.id == id);
	const completed = Boolean(req.body.completed);

	if (index > -1) {
		todos[index].completed = completed;
	}

	return res.send(todos[index]);
});

app.delete('/todos/:id', (req, res) => {
	const { id } = req.params;
	const index = todos.findIndex((todo) => todo.id == id);

	if (index > -1) {
		todos.splice(index, 1);
	}

	res.send(todos);
});

const PORT = 7000;

app.listen(PORT, console.log(`Server running on port ${PORT}`.rainbow.bold));
