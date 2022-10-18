import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { LossServices } from './LossServices';
import { newPetLoss, updatePetLoss } from './types';

const lossServices = new LossServices();

export async function lossPostController(req: Request, res: Response): Promise<void> {
  const userId = req.userId;
  const { date, location, pet } = req.body as newPetLoss;

  try {
    const loss = await lossServices.create({ date: new Date(date), location, userId, pet });
    res.status(httpStatus.CREATED).json({ petLoss: loss });
  } catch (error: any) {
    throw error;
  }
}

export async function lossPutController(req: Request, res: Response): Promise<void> {
  const userId = req.userId;
  const lossId = req.params.id;
  const { date, location, pet } = req.body as updatePetLoss;

  try {
    const dateFromRequest = date ? new Date(date) : undefined;
    await lossServices.update({ id: lossId, userId, date: dateFromRequest, location, pet });
    res.status(httpStatus.OK).send();
  } catch (error: any) {
    throw error;
  }
}

export async function lossByUserGetController(req: Request, res: Response): Promise<void> {
  const userId = req.userId;
  try {
    const petLoss = await lossServices.findByUser(userId);
    res.status(httpStatus.OK).json({ petLoss });
  } catch (error: any) {
    throw error;
  }
}

export async function lastLossGetController(req: Request, res: Response): Promise<void> {
  try {
    const loss = await lossServices.findLast();
    res.status(httpStatus.OK).json({ loss });
  } catch (error: any) {
    throw error;
  }
}

export async function lossByFiltersGetController(req: Request, res: Response): Promise<void> {
  const { query: queryParams } = req;
  const { date, location, gender, type, color, size, breed, age, isCastrated, page } = queryParams as any;
  const dateFromQuery = date ? new Date(date as string) : undefined;
  const numberPage = page ? Number(page) : 1;

  let isCastratedToBol: boolean | undefined = undefined;
  if (isCastrated) {
    isCastratedToBol = isCastrated === 'true' ? true : false;
  }
  let colorToArray: string[] | undefined = undefined;
  if (color) {
    colorToArray = Array.isArray(color) ? color : [color];
  }

  try {
    const limit = 10;
    const petsLoss = await lossServices.findAllLossByFilters(
      { location, date: dateFromQuery, isRecovered: false },
      { type, age, breed, gender, isCastrated: isCastratedToBol, size, color: colorToArray },
      numberPage,
      limit
    );
    res.status(httpStatus.OK).json({ petsLoss, page, pageNext: numberPage + 1 });
  } catch (error: any) {
    throw error;
  }
}

/*export async function LossPost_Controller(req: Request, res: Response): Promise<void> {
  try {
    res.status(httpStatus.CREATED).json({});
  } catch (error: any) {
    throw error;
  }
} */
