import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { UserNotExist } from '../domain/Errors';
import { deactivateUser } from '../services/deactivateUser';

export async function userDeactivateController(req: Request, res: Response): Promise<void> {
  const userId = req.userId;

  try {
    await deactivateUser(userId);
    res.status(httpStatus.OK).send();
  } catch (error: any) {
    if (error instanceof UserNotExist) {
      res.status(httpStatus.NOT_FOUND).send({ errorMessage: error.message });
    } else {
      throw error;
    }
  }
}
