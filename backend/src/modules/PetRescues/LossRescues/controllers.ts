import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { RescueServices } from './RescueServices';
import { newPetRescue, updatePetRescue } from './types';

const rescueServices = new RescueServices();

export async function rescuePostController(req: Request, res: Response): Promise<void> {
  const userId = req.userId;
  const { date, location, publicContact, pet } = req.body as newPetRescue;

  try {
    const petRescue = await rescueServices.create({ date: new Date(date), location, userId, publicContact, pet });
    res.status(httpStatus.CREATED).json({ petRescue });
  } catch (error: any) {
    throw error;
  }
}

export async function rescuePutController(req: Request, res: Response): Promise<void> {
  const userId = req.userId;
  const recuesId = req.params.id;
  const { date, location, publicContact, pet } = req.body as updatePetRescue;

  try {
    const dateFromRequest = date ? new Date(date) : undefined;
    await rescueServices.update({ id: recuesId, userId, date: dateFromRequest, location, publicContact, pet });
    res.status(httpStatus.OK).send();
  } catch (error: any) {
    throw error;
  }
}

export async function ByUserGetController(req: Request, res: Response): Promise<void> {
  const userId = req.userId;
  try {
    const petRescue = await rescueServices.findByUser(userId);
    res.status(httpStatus.OK).json({ petRescue });
  } catch (error: any) {
    throw error;
  }
}

export async function lastRescueGetController(req: Request, res: Response): Promise<void> {
  try {
    const rescues = await rescueServices.findLast();
    res.status(httpStatus.OK).json({ rescue: rescues });
  } catch (error: any) {
    throw error;
  }
}

export async function rescueByFiltersGetController(req: Request, res: Response): Promise<void> {
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
    const petsRescues = await rescueServices.findAllByFilters(
      { location, date: dateFromQuery, isRecovered: false },
      { type, age, breed, gender, isCastrated: isCastratedToBol, size, color: colorToArray },
      numberPage,
      limit
    );
    res.status(httpStatus.OK).json({ petsRescues, page, pageNext: numberPage + 1 });
  } catch (error: any) {
    throw error;
  }
}

export async function rescueGetController(req: Request, res: Response): Promise<void> {
  const rescueId = req.params.id;
  try {
    const rescue = await rescueServices.find(rescueId);
    res.status(httpStatus.OK).json({ rescue });
  } catch (error: any) {
    throw error;
  }
}
