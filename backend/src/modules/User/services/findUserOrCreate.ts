import { AppDataSource } from '../../../database/TypeOrmClient';
import { newUserRequest } from '../domain/types';
import { User } from '../domain/User';
import { UserEntity } from '../persistence/UserEntityDb';
import { createUser } from './createUser';

export async function findUserOrCreate(user: newUserRequest): Promise<newUserRequest> {
  const userRepository = AppDataSource.getRepository<User>(UserEntity);
  const userFind = await userRepository.findOneBy({ id: user.id || '' });

  if (!userFind) {
    const newUser = await createUser(user);
    return newUser;
  }

  if (!userFind.isActive) {
    await userRepository.update(user.id, { _isActive: true } as any);
  }

  return {
    id: userFind.id,
    name: userFind.name,
    email: userFind.email
  };
}
