import { NextFunction, Request, Response } from 'express';
import { ValidationChain, ValidationError, validationResult } from 'express-validator';
import httpStatus from 'http-status';

export const validateReqSchema = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const validationErrors = validationResult(req);
    if (validationErrors.isEmpty()) {
      return next();
    }

    const errors = validationErrors.array().map((err: ValidationError) => ({ [err.param]: err.msg }));
    res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ errors }); // errors: validationErrors.array(),
  };
};
