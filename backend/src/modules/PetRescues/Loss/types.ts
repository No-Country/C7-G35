import { newPet, updatePet } from '../../Pets/types';

export interface newPetLoss {
  userId: string;
  date: Date;
  location: string;
  pet: Omit<newPet, 'owner'>;
}

export interface updatePetLoss {
  id: string;
  userId: string;
  date?: Date;
  location?: string;
  pet?: Omit<updatePet, 'id' | 'owner'>;
}
