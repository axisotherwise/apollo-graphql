const errorHandler = (message, status) => {
  const error = new Error(message);
  error.code = status;
  throw error;
}

export default errorHandler;