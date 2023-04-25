const asyncWrapper = require('../middleware/async');
const Task = require('../models/task');
const { createCustomeError } = require('../errors/custom-error');

const getAllTasks = asyncWrapper(async (req, res) => {
	const tasks = await Task.find({});
	res.status(200).json({ tasks });
	// res.status(200).json({ status: 'success', data: { amount: tasks.length, tasks } });
});

const createTask = asyncWrapper(async (req, res) => {
	const task = await Task.create(req.body);
	res.status(201).json(task);
});

const getTask = asyncWrapper(async (req, res, next) => {
	const { id: taskID } = req.params;
	const task = await Task.findById(taskID);

	if (!task) {
		return createCustomeError(`No task with id: ${taskID}`, 404);
	}

	res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
	const { id: taskID } = req.params;
	const task = await Task.findByIdAndDelete(taskID);
	if (!task) {
		return createCustomeError(`No task with id: ${taskID}`, 404);
	}
	// res.status(200).json({ task });
	// res.status(200).send();
	res.status(200).json({ task: null, status: 'success' });
});

const updateTask = asyncWrapper(async (req, res) => {
	const { id: taskID } = req.params;
	const task = await Task.findByIdAndUpdate(taskID, req.body, {
		new: true,
		runValidators: true,
	});

	if (!task) {
		return createCustomeError(`No task with id: ${taskID}`, 404);
	}
	res.status(200).json({ task });
});

module.exports = { getAllTasks, createTask, getTask, deleteTask, updateTask };
