import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { UserNotExist } from '../domain/Errors';
import { updateUser } from '../services/updateUser';

export async function userPutController(req: Request, res: Response): Promise<void> {
  const userId = req.userId;
  const { phone, name, email, location } = req.body;

  try {
    await updateUser({ id: userId, name, phone, email, location });
    res.status(httpStatus.OK).send();
  } catch (error: any) {
    if (error instanceof UserNotExist) {
      res.status(httpStatus.NOT_FOUND).send({ errorMessage: error.message });
    } else {
      throw error;
    }
  }
}
