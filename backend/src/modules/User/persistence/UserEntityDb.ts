import { EntitySchema } from 'typeorm';
import { User } from '../domain/User';

export const UserEntity = new EntitySchema({
  name: 'User',
  tableName: 'user',
  target: User,
  schema: 'user_acess',

  columns: {
    id: {
      type: String,
      primary: true
    },
    name: {
      type: String
    },
    email: {
      type: String,
      unique: true,
      nullable: false
    },
    location: {
      type: String
    },
    phone: {
      type: String
    },
    _isActive: {
      type: Boolean,
      name: 'is_active'
    }
  }
});
