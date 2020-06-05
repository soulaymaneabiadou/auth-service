const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err) => {
  let error = { ...err };

  // Casting Error
  if (error.message.match(/Cast to/) !== null) {
    const regex = new RegExp('"', 'ig');
    const quotesOccurences = [];
    let i = 0;
    while ((matched = regex.exec(error.message)) && i < 2) {
      quotesOccurences.push(matched.index);
      i++;
    }
    const notFoundId = error.message.substring(
      quotesOccurences[0],
      quotesOccurences[1] + 1
    );
    const message = `Resource not found with ID of ${notFoundId}`;
    error = new ErrorResponse(message, 404);
  }

  // Duplicate field Error
  if (error.message.match(/11000/) !== null) {
    const duplicateField = error.message.substring(
      error.message.indexOf('{') + 2,
      error.message.lastIndexOf(':')
    );

    const message = `Duplicate field value entered: ${duplicateField}`;
    error = new ErrorResponse(message, 400);
  }

  // Validation Error
  if (error.message.match(/validation failed/) !== null) {
    const indexStart = error.message.lastIndexOf(':') + 2;

    const message = error.message.substring(indexStart);
    error = new ErrorResponse(message, 400);
  }

  return {
    success: false,
    error: {
      statusCode: error.statusCode || 500,
      message: error.message || 'Server Error'
    }
  };
};

module.exports = errorHandler;
