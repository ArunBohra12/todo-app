const sendErrorDev = (err, res) => {
  // For the dev mode we don't hide any details of the err
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // Error that is expected happens
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: 'fail',
      message: err.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Sorry something went wrong',
  });
};

// Will handle all the errors that happen in the express application
const globalErrorHandlingMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
    return;
  }

  if (process.env.NODE_ENV === 'production') {
    sendErrorProd(err, res);
    return;
  }
};

export default globalErrorHandlingMiddleware;
