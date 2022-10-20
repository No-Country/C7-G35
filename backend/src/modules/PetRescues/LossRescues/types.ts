import { newPet, updatePet } from '../../Pets/types';

export interface newPetRescue {
  userId: string;
  date: Date;
  location: string;
  publicContact?: string;
  pet: Omit<newPet, 'owner'>;
}

export interface updatePetRescue {
  id: string;
  userId: string;
  date?: Date;
  location?: string;
  pet?: Omit<updatePet, 'id' | 'owner'>;
}
