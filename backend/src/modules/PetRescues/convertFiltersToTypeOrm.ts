import { FindOperator, Like, Repository, SelectQueryBuilder } from 'typeorm';
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

    const lossFiltersFields = Reflect.ownKeys(lossFiltersToParse);
    lossFiltersFields.forEach(filterField => {
      const value = Reflect.get(lossFiltersToParse, filterField);
      const valueExists = value !== null && value !== undefined;
      if (valueExists) {
        queryLoss.andWhere(`loss.${String(filterField)} = :${String(filterField)}`, {
          [filterField]: value
        });
      }
    });

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

    const lossFiltersFields = Reflect.ownKeys(rescueFiltersToParse);
    lossFiltersFields.forEach(filterField => {
      const value = Reflect.get(rescueFiltersToParse, filterField);
      const valueExists = value !== null && value !== undefined;
      if (valueExists) {
        queryRescue.andWhere(`rescue.${String(filterField)} = :${String(filterField)}`, {
          [filterField]: value
        });
      }
    });

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

/*
export function convertLossFiltersToQuery(
  lossFiltersToParse: lossFilters,
  petFiltersToParse: petFilters
): SelectQueryBuilder<Loss> {
  let queryLoss = AppDataSource.getRepository(Loss).createQueryBuilder('loss').innerJoinAndSelect('loss.pet', 'pet');

  const lossFiltersFields = Reflect.ownKeys(lossFiltersToParse);
  lossFiltersFields.forEach(filterField => {
    const value = Reflect.get(lossFiltersToParse, filterField);
    if (value) {
      queryLoss.andWhere(`loss.${String(filterField)} = :${String(filterField)}`, {
        [filterField]: value
      });
    }
  });

  const { orWheresColors, wheresOptionsPets } = convertPetsFilters(petFiltersToParse);
  queryLoss.andWhere({ pet: wheresOptionsPets });
  if (orWheresColors) {
    queryLoss.andWhere(orWheresColors);
  }

  return queryLoss;
}

function convertPetsFilters(petFiltersToParse: petFilters) {
  const petFilters = Object.entries(petFiltersToParse);
  let wheresOptionsPets = {};
  petFilters.forEach(filter => {
    const [field, value] = filter;

    if (value && field !== 'color') {
      wheresOptionsPets = { ...wheresOptionsPets, [field]: value };
    }
  });

  const colors = petFiltersToParse.color;
  let orWheresColors;
  if (colors) {
    orWheresColors = convertPetColorsFilters(colors);
  }

  return { wheresOptionsPets, orWheresColors };
} 

function convertPetColorsFilters(colors: string[]) {
  const orWhereColors: { pet: { color: FindOperator<string> } }[] = [];
  colors.forEach(color => {
    const findOperator = Like(`%${color}%`);

    orWhereColors.push({ pet: { color: findOperator } });
  });
  return orWhereColors;
}
*/
