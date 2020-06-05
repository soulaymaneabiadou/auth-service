errorName = {
  BAD_REQUEST: 'BAD_REQUEST',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR'
};

errorType = {
  BAD_REQUEST: {
    statusCode: 400
  },
  UNAUTHORIZED: {
    statusCode: 401
  },
  FORBIDDEN: {
    statusCode: 403
  },
  NOT_FOUND: {
    statusCode: 404
  },
  INTERNAL_SERVER_ERROR: {
    message: 'Internal Server Error',
    statusCode: 500
  }
};
