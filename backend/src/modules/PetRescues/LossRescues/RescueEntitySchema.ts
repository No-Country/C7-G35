import { EntitySchema } from 'typeorm';
import { Rescue } from './Rescue';

export const RescueEntitySchema = new EntitySchema<Rescue>({
  name: 'Rescue',
  tableName: 'rescues',
  target: Rescue,
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
    },
    publicContact: {
      type: String,
      name: 'public_contact',
      nullable: true
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
