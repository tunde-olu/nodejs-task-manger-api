class CustomAPIerror extends Error {
	constructor(message, statusCode) {
		super(message);
		this.statusCode = statusCode;
	}
}

const createCustomeError = (message, statusCode) => {
	return new CustomAPIerror(message, statusCode);
};

module.exports = { createCustomeError, CustomAPIerror };
