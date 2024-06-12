import { User } from '../domain/User';

const users: User[] = []; // Esto es una simulación en memoria. Usar una base de datos real en producción.

const createUser = async (user: User): Promise<void> => {
  users.push(user);
};

const findUserByUsername = async (username: string): Promise<User | undefined> => {
  return users.find(user => user.username === username);
};

export default {
  createUser,
  findUserByUsername
};
