import { NextFunction, Request, Response } from 'express';
import { HttpError } from 'http-errors';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(`[Error Handler] ${err.name}: ${err.message}`);

  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message,
    });
  }

  const statusCode = 500;
  const message = 'Ocorreu um erro interno no servidor.';

  return res.status(statusCode).json({
    status: statusCode,
    message: message,
  });
};
