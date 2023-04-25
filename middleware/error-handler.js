const { CustomAPIerror } = require('../errors/custom-error');

const errorHandlerMiddleware = (err, req, res, next) => {
	if (err instanceof CustomAPIerror) {
		console.log(err.statusCode);
		return res.status(err.statusCode).json({ msg: err.message });
	}
	return res.status(404).json({ msg: 'Something went wrong, please try again' });
};

module.exports = errorHandlerMiddleware;
