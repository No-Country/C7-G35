import { AppDataSource } from '../../../database/TypeOrmClient';
import { UserNotExist } from '../domain/Errors';
import { User } from '../domain/User';
import { UserEntity } from '../persistence/UserEntityDb';

export async function findUserActive(id: string): Promise<User> {
  const userRepository = AppDataSource.getRepository<User>(UserEntity);
  const where = { id: id || '', _isActive: true };
  const user = await userRepository.findOneBy(where);

  if (!user) {
    throw new UserNotExist(id);
  }

  return user;
}
