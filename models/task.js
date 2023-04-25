const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'must provide name'],
		maxLength: [20, 'name cannot be more than 20 characters'],
		trim: true,
	},
	completed: {
		type: Boolean,
		default: false,
	},
});

module.exports = mongoose.model('Task', TaskSchema);
