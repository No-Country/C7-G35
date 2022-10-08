import { body } from 'express-validator';

export const updateUserReqSchema = [body(['name', 'phone', 'email', 'location']).optional().isString()];
