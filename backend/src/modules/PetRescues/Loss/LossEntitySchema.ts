import { EntitySchema } from 'typeorm';
import { Loss } from './Loss';

export const LossEntitySchema = new EntitySchema<Loss>({
  name: 'Loos',
  tableName: 'loss',
  target: Loss,
  schema: 'Pet_Rescues',

  columns: {
    id: {
      type: String,
      primary: true,
      generated: 'uuid'
    },
    userId: { type: String },
    date: {
      type: Date
    },
    location: {
      type: String
    },
    isRecovered: {
      type: Boolean,
      name: 'is_recovered'
    }
  },
  relations: {
    pet: {
      type: 'one-to-one',
      target: 'Pet',
      eager: true,
      cascade: ['insert', 'update'],
      joinColumn: true
    }
  }
});
