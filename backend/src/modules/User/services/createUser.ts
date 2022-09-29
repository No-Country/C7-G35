import { AppDataSource } from '../../../database/TypeOrmClient';
import { newUserRequest } from '../domain/types';
import { User } from '../domain/User';
import { UserEntity } from '../persistence/UserEntityDb';

export async function createUser(newUser: newUserRequest): Promise<newUserRequest> {
  const user = User.register(newUser.id, newUser.name, newUser.email);

  const repository = AppDataSource.getRepository<User>(UserEntity);
  await repository.save(user);

  return newUser;
}
