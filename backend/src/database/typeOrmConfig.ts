import { config } from 'dotenv';

config();

export const postgresConfig = {
  host: process.env.POSTGRES_HOST || '',
  port: Number(process.env.POSTGRES_PORT) || 0,
  username: process.env.POSTGRES_USER || '',
  password: process.env.POSTGRES_PASSWORD || '',
  database: process.env.POSTGRES_DATA_BASE || ''
};
