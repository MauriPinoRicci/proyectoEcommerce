import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    res.status(500).json({ message: err.message });
  } else {
    res.status(500).json({ message: 'An unknown error occurred' });
  }
};

export default errorHandler;
