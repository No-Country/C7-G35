import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { UserNotExist } from '../domain/Errors';
import { findUserActive } from '../services/findUserActive';

export async function userMeGetController(req: Request, res: Response): Promise<void> {
  const userId = req.userId;

  try {
    const user = await findUserActive(userId);
    res.status(httpStatus.OK).json({ user: user.toResponse() });
  } catch (error: any) {
    if (error instanceof UserNotExist) {
      res.status(httpStatus.NOT_FOUND).send({ errorMessage: error.message });
    } else {
      throw error;
    }
  }
}
