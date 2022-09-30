import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import * as jwt from 'jsonwebtoken';
import { configEnv } from './config';
import { TokenPayload } from './services/tokenServices';

export function verifyAuthToken(req: Request, res: Response, next: NextFunction) {
  try {
    const authorization = req.get('authorization');

    const token = authorization && authorization.toLowerCase().startsWith('bearer') ? authorization.substring(7) : null;

    const decodedToken = token ? (jwt.verify(token, configEnv.secretKey) as TokenPayload) : null;

    if (!decodedToken || !decodedToken.id) {
      return res.status(httpStatus.UNAUTHORIZED).json({ errorMessage: 'token missing or invalid' });
    }

    req.user = { ...decodedToken };
    req.userId = decodedToken.id;
    next();
  } catch (err: any) {
    res.status(httpStatus.UNAUTHORIZED).json({ errorMessage: 'token missing or invalid' });
  }
}
