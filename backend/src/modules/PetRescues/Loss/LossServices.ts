import { Repository } from 'typeorm';
import { AppDataSource } from '../../../database/TypeOrmClient';
import { Pet } from '../../Pets/Pet';
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
    const loss = await this.repository.findOneBy({ id });
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
}
