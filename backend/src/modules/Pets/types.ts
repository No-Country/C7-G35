export type Gender = 'male' | 'female';

export interface newPet {
  gender: Gender;
  owner: string;
  type: string;
  color: string[];
  size: string;
  images?: string[];
  name?: string;
  breed?: string;
  age?: string;
  isCastrated?: boolean;
  description?: string;
}

export interface updatePet {
  id: string;
  owner: string;
  gender?: Gender;
  type?: string;
  color?: string[];
  size?: string;
  images?: string[];
  name?: string;
  breed?: string;
  age?: string;
  isCastrated?: boolean;
  description?: string;
}
