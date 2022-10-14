import { EntitySchema } from 'typeorm';
import { Pet } from './Pet';

export const LossEntitySchema = new EntitySchema<Pet>({
  name: 'Pet',
  tableName: 'pets',
  target: Pet,
  schema: 'pet',

  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid'
    },
    owner: {
      type: String
    },
    gender: { type: String },
    type: { type: String },
    color: { type: 'simple-array' },
    size: { type: String },

    name: { type: String, nullable: true },
    breed: { type: String, nullable: true },
    age: { type: String, nullable: true },
    isCastrated: { type: Boolean, nullable: true },
    description: { type: String, nullable: true },
    images: { type: 'simple-array', nullable: true }
  }
});
