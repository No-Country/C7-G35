export type Gender = 'male' | 'female';

export interface newPet {
  gender: Gender;
  owner: string;
  type: string;
  images?: string[];
  name?: string;
  race?: string;
  age?: string;
  isCastrated?: boolean;
  description?: string;
}

export interface updatePet {
  id: string;
  owner: string;
  gender?: Gender;
  type?: string;
  images?: string[];
  name?: string;
  race?: string;
  age?: string;
  isCastrated?: boolean;
  description?: string;
}
