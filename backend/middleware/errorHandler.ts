import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction): void {
  if (err instanceof SyntaxError && 'body' in err) {
    res.status(400).json({ error: 'malformed JSON in request body' });
    return;
  }

  console.error(err);
  res.status(500).json({ error: 'internal server error' });
}
