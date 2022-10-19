import { Repository } from 'typeorm';
import { AppDataSource } from '../../../database/TypeOrmClient';
import { Pet } from '../../Pets/Pet';
import { PetServices } from '../../Pets/PetServices';
import { FiltersToTypeOrmQueryConverter } from '../convertFiltersToTypeOrm';
import { lossFilters, petFilters } from '../types';
import { Loss } from './Loss';
import { newPetLoss, updatePetLoss } from './types';

export class LossServices {
  private repository: Repository<Loss>;

  constructor() {
    this.repository = AppDataSource.getRepository(Loss);
  }

  async create(newLost: newPetLoss): Promise<Loss> {
    const pet = Pet.create({ ...newLost.pet, owner: newLost.userId });
    const loss = Loss.create({ ...newLost, pet });
    const lossSaved = await this.repository.save(loss);
    return lossSaved;
  }

  async registerPetAsLoss(newLost: Omit<newPetLoss, 'pet'>, petId: string): Promise<Loss> {
    const pet = await new PetServices().findPet(petId);
    const loss = Loss.create({ ...newLost, pet });
    return await this.repository.save(loss);
  }

  async markAPetLossAsRecovered(lossId: string, userId: string): Promise<void> {
    const loss = await this.findLoss(lossId);
    const usersIsOwner = loss.userId === userId;
    if (!usersIsOwner) {
      throw new Error('no tiene permiso sobre esta mascota');
    }

    await this.repository.update(loss.id, { isRecovered: true });
  }

  async update(updateLoss: updatePetLoss): Promise<void> {
    const loss = await this.findLoss(updateLoss.id);
    if (loss.userId !== updateLoss.userId) {
      throw new Error('user does not have permissions');
    }
    if (updateLoss.pet) {
      await AppDataSource.getRepository(Pet).update(loss.pet.id, { ...updateLoss.pet });
    }
    await this.repository.update(updateLoss.id, {
      ...updateLoss,
      id: undefined,
      userId: undefined,
      pet: undefined
    });
  }

  public async findLoss(id: string): Promise<Loss> {
    const loss = await this.repository.findOneBy({ id: id || '' });
    if (!loss) {
      throw new Error('Pet Loss not Exists');
    }
    return loss;
  }

  async findByUser(userId: string): Promise<Loss[]> {
    const petLoss = await this.repository.findBy({ userId });
    return petLoss;
  }

  async findLast(): Promise<Loss[]> {
    //refac...
    const petLoss = await this.repository.find({ where: { isRecovered: false }, order: { date: 'DESC' }, take: 3 });
    return petLoss;
  }

  async findAllLossByFilters(
    lossFilters: lossFilters,
    petFilters: petFilters,
    page: number,
    limit: number,
    dateOrder?: 'DESC' | 'ASC'
  ): Promise<Loss[]> {
    const toQueryConverter = new FiltersToTypeOrmQueryConverter();
    const query = toQueryConverter.convertLossFiltersToQuery(lossFilters, petFilters);
    query.skip(limit * (page - 1));
    query.take(limit);
    if (dateOrder) {
      query.addOrderBy('date', dateOrder);
    }

    const petLoss = await query.getMany();

    return petLoss;
  }
}
