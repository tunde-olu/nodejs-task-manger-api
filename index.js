const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
require('dotenv').config();

const port = process.env.PORT || 3000;

/**
 * Routes :
 * 	app.get('/api/v1/tasks')	- get all the task
 * 	app.post('/api/v1/tasks')	- create a new task
 * 	app.get('/api/v1/tasks/:id')	- get single task
 * 	app.patch('/api/v1/tasks/:id')	- update task
 * 	app.delete('/api/v1/tasks/:id')	- delete task
 */

// public
app.use(express.static('./public/'));

// middleware
app.use(express.json());

// routes
app.use('/api/v1/tasks', tasks);

app.get('/', (req, res) => {
	res.send('Hello world');
});

app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(port, () => {
			console.log(`server is listening on port ${port}...`);
		});
	} catch (error) {
		console.log(error);
	}
};

start();
