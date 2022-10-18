import { Gender } from '../Pets/types';

export interface lossFilters {
  date?: Date;
  location?: string;
  isRecovered: boolean;
}

export interface petFilters {
  gender?: Gender;
  type?: string;
  color?: string[];
  size?: string;
  breed?: string;
  age?: string;
  isCastrated?: boolean;
}
