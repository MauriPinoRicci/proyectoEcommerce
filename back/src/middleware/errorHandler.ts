import { Request, Response, NextFunction } from 'express';

// Middleware para manejar errores
const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    // Si el error es una instancia de Error, responde con el mensaje de error
    res.status(500).json({ message: err.message });
  } else {
    // Para otros tipos de errores, responde con un mensaje genérico
    res.status(500).json({ message: 'An unknown error occurred' });
  }
};

export default errorHandler;
