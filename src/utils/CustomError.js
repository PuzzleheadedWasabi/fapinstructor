class CustomError extends Error {
  constructor(message, error) {
    super(error);
    this.message = message;
  }
}

export default CustomError;
