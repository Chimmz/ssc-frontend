interface FieldError {
  field: string;
  msg: string;
}

export default class ApiError extends Error {
  readonly message: string;
  readonly statusCode: number;
  readonly isOperational: boolean;
  readonly errors: FieldError[] | undefined;

  constructor(statusCode: number, msg: string, errors?: FieldError[]) {
    super(msg);
    this.message = msg;
    this.statusCode = statusCode;
    this.errors = errors;
    this.isOperational = `${statusCode}`.startsWith('4');
  }
}
