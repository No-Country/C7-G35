import { body } from 'express-validator';

export const newPetReqSchema = [
  body(['gender', 'type']).exists().isString(),
  body(['name', 'breed', 'age', 'description']).optional().isString(),
  body('isCastrated').optional().isBoolean(),
  body('images').optional().isArray()
];

export const updatePetReqSchema = [
  body('id').exists().isString(),
  body(['name', 'type', 'breed', 'age', 'description', 'gender']).optional().isString(),
  body('isCastrated').optional().isBoolean(),
  body('images').optional().isArray()
];
