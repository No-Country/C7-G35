import { Between, FindOperator, Like, Repository, SelectQueryBuilder } from 'typeorm';
import { AppDataSource } from '../../database/TypeOrmClient';
import { Loss } from './Loss/Loss';
import { Rescue } from './LossRescues/Rescue';
import { lossFilters, petFilters, rescueFilters } from './types';

export class FiltersToTypeOrmQueryConverter {
  private lossRepository: Repository<Loss>;
  private rescueRepository: Repository<Loss>;

  constructor() {
    this.lossRepository = AppDataSource.getRepository(Loss);
    this.rescueRepository = AppDataSource.getRepository(Rescue);
  }

  public convertLossFiltersToQuery(
    lossFiltersToParse: lossFilters,
    petFiltersToParse: petFilters
  ): SelectQueryBuilder<Loss> {
    let queryLoss = this.lossRepository.createQueryBuilder('loss').innerJoinAndSelect('loss.pet', 'pet');

    const lossFilter = Object.entries(lossFiltersToParse);
    let wheresOptionsLoss = {};
    lossFilter.forEach(filter => {
      const [field, value] = filter;
      const valueExists = value !== null && value !== undefined;
      if (valueExists && field !== 'date') {
        wheresOptionsLoss = { ...wheresOptionsLoss, [field]: value };
      }
    });
    if (lossFiltersToParse.date) {
      const fromDate = new Date(lossFiltersToParse.date);
      fromDate.setDate(fromDate.getDate() - 32);
      const toDate = new Date(lossFiltersToParse.date);
      toDate.setDate(toDate.getDate() + 2);
      wheresOptionsLoss = { ...wheresOptionsLoss, date: Between(fromDate, toDate) };
    }

    queryLoss.andWhere(wheresOptionsLoss);

    const { orWheresColors, wheresOptionsPets } = this.convertPetsFilters(petFiltersToParse);
    queryLoss.andWhere({ pet: wheresOptionsPets });
    if (orWheresColors) {
      queryLoss.andWhere(orWheresColors);
    }

    return queryLoss;
  }

  public convertRescueFiltersToQuery(
    rescueFiltersToParse: rescueFilters,
    petFiltersToParse: petFilters
  ): SelectQueryBuilder<Loss> {
    let queryRescue = this.rescueRepository.createQueryBuilder('rescue').innerJoinAndSelect('rescue.pet', 'pet');

    const rescueFilters = Object.entries(rescueFiltersToParse);
    let wheresOptionsRescues = {};
    rescueFilters.forEach(filter => {
      const [field, value] = filter;
      const valueExists = value !== null && value !== undefined;
      if (valueExists && field !== 'date') {
        wheresOptionsRescues = { ...wheresOptionsRescues, [field]: value };
      }
    });
    if (rescueFiltersToParse.date) {
      const toDate = new Date(rescueFiltersToParse.date);
      toDate.setDate(toDate.getDate() + 32);

      wheresOptionsRescues = { ...wheresOptionsRescues, date: Between(rescueFiltersToParse.date, toDate) };
    }
    queryRescue.andWhere(wheresOptionsRescues);

    const { orWheresColors, wheresOptionsPets } = this.convertPetsFilters(petFiltersToParse);
    queryRescue.andWhere({ pet: wheresOptionsPets });
    if (orWheresColors) {
      queryRescue.andWhere(orWheresColors);
    }

    return queryRescue;
  }

  private convertPetsFilters(petFiltersToParse: petFilters) {
    const petFilters = Object.entries(petFiltersToParse);
    let wheresOptionsPets = {};
    petFilters.forEach(filter => {
      const [field, value] = filter;

      const valueExists = value !== null && value !== undefined;
      if (valueExists && field !== 'color') {
        wheresOptionsPets = { ...wheresOptionsPets, [field]: value };
      }
    });

    const colors = petFiltersToParse.color;
    let orWheresColors;
    if (colors) {
      orWheresColors = this.convertPetColorsFilters(colors);
    }

    return { wheresOptionsPets, orWheresColors };
  }

  private convertPetColorsFilters(colors: string[]) {
    const orWhereColors: { pet: { color: FindOperator<string> } }[] = [];
    colors.forEach(color => {
      const findOperator = Like(`%${color}%`);

      orWhereColors.push({ pet: { color: findOperator } });
    });
    return orWhereColors;
  }
}
