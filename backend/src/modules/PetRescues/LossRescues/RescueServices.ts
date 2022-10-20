import { Repository } from 'typeorm';
import { AppDataSource } from '../../../database/TypeOrmClient';
import { Pet } from '../../Pets/Pet';
import { FiltersToTypeOrmQueryConverter } from '../convertFiltersToTypeOrm';
import { petFilters, rescueFilters } from '../types';
import { Rescue } from './Rescue';
import { newPetRescue, updatePetRescue } from './types';

export class RescueServices {
  private repository: Repository<Rescue>;

  constructor() {
    this.repository = AppDataSource.getRepository(Rescue);
  }

  async create(newRescue: newPetRescue): Promise<Rescue> {
    const pet = Pet.create({ ...newRescue.pet, owner: newRescue.userId });
    const rescue = Rescue.create({ ...newRescue, pet });
    const rescueSaved = await this.repository.save(rescue);
    //create event
    return rescueSaved;
  }

  async update(updateRescue: updatePetRescue): Promise<void> {
    const rescue = await this.find(updateRescue.id);
    if (rescue.userId !== updateRescue.userId) {
      throw new Error('user does not have permissions');
    }
    if (updateRescue.pet) {
      await AppDataSource.getRepository(Pet).update(rescue.pet.id, { ...updateRescue.pet });
    }
    await this.repository.update(updateRescue.id, {
      ...updateRescue,
      id: undefined,
      userId: undefined,
      pet: undefined
    });
  }

  public async find(id: string): Promise<Rescue> {
    const rescue = await this.repository.findOneBy({ id });
    if (!rescue) {
      throw new Error('Pet Rescue not Exists');
    }
    return rescue;
  }

  async findByUser(userId: string): Promise<Rescue[]> {
    const petRescues = await this.repository.findBy({ userId });
    return petRescues;
  }

  async findLast(): Promise<Rescue[]> {
    //refac...
    const petRescue = await this.repository.find({ where: { isRecovered: false }, order: { date: 'DESC' }, take: 3 });
    return petRescue;
  }

  async findAllByFilters(
    rescuesFilters: rescueFilters,
    petFilters: petFilters,
    page: number,
    limit: number,
    dateOrder?: 'DESC' | 'ASC'
  ): Promise<Rescue[]> {
    const toQueryConverter = new FiltersToTypeOrmQueryConverter();
    const query = toQueryConverter.convertRescueFiltersToQuery(rescuesFilters, petFilters);
    query.skip(limit * (page - 1));
    query.take(limit);
    if (dateOrder) {
      query.addOrderBy('date', dateOrder);
    }

    const petRescue = await query.getMany();

    return petRescue;
  }
}
