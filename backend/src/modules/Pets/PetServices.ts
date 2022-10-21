import { Repository } from 'typeorm';
import { AppDataSource } from '../../database/TypeOrmClient';
import { IsNotOwner, PetNotExist } from './Errors';
import { Pet } from './Pet';
import { newPet, updatePet } from './types';

export class PetServices {
  private repository: Repository<Pet>;

  constructor() {
    this.repository = AppDataSource.getRepository(Pet); //petEntity
  }

  public async create(newPet: newPet): Promise<Pet> {
    const pet = Pet.create(newPet);
    return await this.repository.save(pet);
  }

  public async addImage(petId: string, ownerId: string, imageUrl: string): Promise<Pet> {
    const pet = await this.findPet(petId);
    this.verifyUserIsOwnerOrFail(ownerId, pet);

    pet.addImageUrl(imageUrl);
    await this.repository.update(pet.id, { images: pet.images });

    return pet;
  }

  public async findPet(petId: string): Promise<Pet> {
    const pet = await this.repository.findOneBy({ id: petId || '' });
    if (!pet) {
      throw new PetNotExist(petId);
    }
    return pet;
  }

  public async findPetsByOwner(ownerId: string): Promise<Pet[]> {
    const pets = await this.repository.find({ where: { owner: ownerId } });
    return pets;
  }

  public async update(updatePet: updatePet): Promise<void> {
    const pet = await this.findPet(updatePet.id);
    this.verifyUserIsOwnerOrFail(updatePet.owner, pet);

    await this.repository.update(updatePet.id, { ...updatePet });
  }

  private verifyUserIsOwnerOrFail(userId: string, pet: Pet): void {
    const userIsOwner = pet.userIsOwner(userId);
    if (!userIsOwner) {
      throw new IsNotOwner(userId);
    }
  }

  public async delete(petId: string, userId: string): Promise<void> {
    const pet = await this.findPet(petId);
    this.verifyUserIsOwnerOrFail(userId, pet);

    await this.repository.delete({ id: petId });
  }
}
