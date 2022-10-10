import { AppDataSource } from '../../../database/TypeOrmClient';
import { User } from '../domain/User';
import { UserEntity } from '../persistence/UserEntityDb';
import { findUserActive } from './findUserActive';

export async function deactivateUser(userId: string): Promise<void> {
  const user = await findUserActive(userId);
  user.deactivate();

  const repository = AppDataSource.getRepository<User>(UserEntity);
  await repository.save(user);
}
