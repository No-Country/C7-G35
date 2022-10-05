import { Response } from 'express';
import httpStatus from 'http-status';

export const petsErrorsHandlerMap: { [key: string]: Function } = {
  PetNotExist: (err: Error, res: Response) => {
    res.status(httpStatus.NOT_FOUND).json({ errorMessage: err.message });
  },
  IsNotOwner: (err: Error, res: Response) => {
    res.status(httpStatus.UNAUTHORIZED).json({ errorMessage: err.message });
  }
};
