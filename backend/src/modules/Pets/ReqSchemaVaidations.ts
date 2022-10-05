import { body } from 'express-validator';

export const newPetReqSchema = [
  body(['gender', 'type']).exists().isString(),
  body(['name', 'race', 'age', 'description']).optional().isString(),
  body('isCastrated').optional().isBoolean(),
  body('images').optional().isArray()
];

export const updatePetReqSchema = [
  body('id').exists().isString(),
  body(['name', 'type', 'race', 'age', 'description', 'gender']).optional().isString(),
  body('isCastrated').optional().isBoolean(),
  body('images').optional().isArray()
];
