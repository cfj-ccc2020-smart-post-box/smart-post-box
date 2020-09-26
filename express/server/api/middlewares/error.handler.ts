import { Request, Response /* , NextFunction */ } from 'express';

export default function errorHandler(
  err: { errors; message: string; status: number },
  req: Request,
  res: Response /* ,
  next: NextFunction */
): void {
  const errors = err.errors || [{ message: err.message }];
  res.status(err.status || 500).json({ errors });
}
