import { AppDataSource } from '../../../database/TypeOrmClient';
import { userUpdate } from '../domain/types';
import { User } from '../domain/User';
import { UserEntity } from '../persistence/UserEntityDb';

export async function updateUser(userUpdate: userUpdate): Promise<void> {
  const repository = AppDataSource.getRepository<User>(UserEntity);
  await repository.update(userUpdate.id, { ...userUpdate, id: undefined });
}
