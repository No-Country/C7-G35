import * as jwt from 'jsonwebtoken';
import { configEnv } from '../config';

export interface TokenPayload {
  id: number;
}

export function createToken(userId: string): string {
  const payload = {
    id: userId
  };

  const tokenJwt = jwt.sign(payload, configEnv.secretKey, { expiresIn: '24h' });

  return tokenJwt;
}
