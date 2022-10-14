import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { domainErrorHandler } from '../../api/Shared/domainErrorHandler';
import { UploadImageFail } from '../../api/Shared/uploadImageMulter';
import { petsErrorsHandlerMap } from './petsErrorsHandler';
import { PetServices } from './PetServices';
import { newPet, updatePet } from './types';

const petServices = new PetServices();

export async function petPostController(req: Request, res: Response): Promise<void> {
  const userId = req.userId;
  const { name, gender, images, type, age, description, isCastrated, breed, size, color } = req.body as newPet;

  try {
    const pet = await petServices.create({
      gender,
      type,
      color,
      size,
      images,
      owner: userId,
      name,
      description,
      age,
      isCastrated,
      breed
    });
    res.status(httpStatus.CREATED).json({ pet });
  } catch (error: any) {
    domainErrorHandler(res, error, petsErrorsHandlerMap);
  }
}

export async function petPutController(req: Request, res: Response): Promise<void> {
  const owner = req.userId;
  const petId = req.params.id;
  const { name, gender, images, type, age, description, isCastrated, breed } = req.body as updatePet;

  try {
    await petServices.update({ id: petId, owner, age, description, gender, images, isCastrated, name, breed, type });
    res.status(httpStatus.OK).send();
  } catch (error: any) {
    domainErrorHandler(res, error, petsErrorsHandlerMap);
  }
}

export async function petsGetController(req: Request, res: Response): Promise<void> {
  const userId = req.userId;

  try {
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
    await petServices.delete(petId, userId);
    res.status(httpStatus.OK).send();
  } catch (error: any) {
    domainErrorHandler(res, error, petsErrorsHandlerMap);
  }
}

export async function petImagePostController(req: Request, res: Response): Promise<void> {
  const userId = req.userId;
  const petId = req.params.id;
  const imageUrl = req.body.imageUrl;

  if (!imageUrl) {
    throw new UploadImageFail('no url received');
  }

  try {
    const pet = await petServices.addImage(petId, userId, imageUrl);
    res.send({ pet, imageUrl });
  } catch (error: any) {
    domainErrorHandler(res, error, petsErrorsHandlerMap);
  }
}
