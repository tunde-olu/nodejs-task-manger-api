const mongoose = require('mongoose');

const connectDB = (uri) => {
	return mongoose.connect(uri, { dbName: '03-TASK-MANAGER' });
};

module.exports = connectDB;
