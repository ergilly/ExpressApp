import { User } from '../types';

// In-memory data store for demo purposes
export let users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

export const getUserById = (id: number): User | undefined => {
  return users.find(u => u.id === id);
};

export const getUserIndexById = (id: number): number => {
  return users.findIndex(u => u.id === id);
};

export const addUser = (name: string, email: string): User => {
  const newUser: User = {
    id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
    name,
    email
  };
  users.push(newUser);
  return newUser;
};

export const updateUser = (id: number, name: string, email: string): User | null => {
  const userIndex = getUserIndexById(id);
  if (userIndex === -1) return null;
  
  users[userIndex] = { id, name, email };
  return users[userIndex];
};

export const deleteUser = (id: number): User | null => {
  const userIndex = getUserIndexById(id);
  if (userIndex === -1) return null;
  
  return users.splice(userIndex, 1)[0];
};

export const getAllUsers = (): User[] => {
  return users;
};
