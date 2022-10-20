import { newPet, updatePet } from '../../Pets/types';

export interface newPetLoss {
  userId: string;
  date: Date;
  location: string;
  pet: Omit<newPet, 'owner'>;
  publicContact?: string;
}

export interface updatePetLoss {
  id: string;
  userId: string;
  date?: Date;
  location?: string;
  publicContact?: string;
  pet?: Omit<updatePet, 'id' | 'owner'>;
}
