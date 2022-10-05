import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { domainErrorHandler } from '../../api/Shared/domainErrorHandler';
import { petsErrorsHandlerMap } from './petsErrorsHandler';
import { PetServices } from './PetServices';
import { newPet, updatePet } from './types';

export async function petPostController(req: Request, res: Response): Promise<void> {
  const userId = req.userId;
  const { name, gender, images, type, age, description, isCastrated, race } = req.body as newPet;

  try {
    const petServices = new PetServices();
    const pet = await petServices.create({
      gender,
      type,
      images,
      owner: userId,
      name,
      description,
      age,
      isCastrated,
      race
    });
    res.status(httpStatus.CREATED).json({ pet });
  } catch (error: any) {
    domainErrorHandler(res, error, petsErrorsHandlerMap);
  }
}

export async function petPutController(req: Request, res: Response): Promise<void> {
  const owner = req.userId;
  const petId = req.params.id;
  const { name, gender, images, type, age, description, isCastrated, race } = req.body as updatePet;

  try {
    const petServices = new PetServices();
    await petServices.update({ id: petId, owner, age, description, gender, images, isCastrated, name, race, type });
    res.status(httpStatus.OK).send();
  } catch (error: any) {
    domainErrorHandler(res, error, petsErrorsHandlerMap);
  }
}

export async function petsGetController(req: Request, res: Response): Promise<void> {
  const userId = req.userId;

  try {
    const petServices = new PetServices();
    const pets = await petServices.findPetsByOwner(userId);
    res.status(httpStatus.OK).json({ pets });
  } catch (error: any) {
    domainErrorHandler(res, error, petsErrorsHandlerMap);
  }
}

export async function petDeleteController(req: Request, res: Response): Promise<void> {
  const userId = req.userId;
  const petId = req.params.id;

  try {
    const petServices = new PetServices();
    await petServices.delete(petId, userId);
    res.status(httpStatus.OK).send();
  } catch (error: any) {
    domainErrorHandler(res, error, petsErrorsHandlerMap);
  }
}
