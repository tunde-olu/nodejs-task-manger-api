const path = require('path');
const fs = require('fs');
const { json } = require('express');

const dataPath = path.join(process.cwd(), 'data.json');

console.log(dataPath);

const data = fs.readFileSync(dataPath, 'utf-8');

const parsedData = JSON.parse(data);

parsedData.push({ id: 5, name: 'tunde' });

const getAllTasks = (req, res) => {
	res.send('get all tasks');
};

const createTask = (req, res) => {
	const { name } = req.body;
	parsedData.push({ id: new Date().getTime(), name });

	fs.writeFileSync(dataPath, JSON.stringify(parsedData), 'utf-8');

	res.json(parsedData);
};

const getTask = (req, res) => {
	res.json({ id: req.params.id });
};

const updateTask = (req, res) => {
	res.send('update single task');
};

const deleteTask = (req, res) => {
	res.send('delete single task');
};

module.exports = { getAllTasks, createTask, getTask, deleteTask, updateTask };
