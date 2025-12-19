import Dexie, { Table } from 'dexie';
import { User } from '../models/user';

export class UserDB extends Dexie {
  users!: Table<User, number>;

  constructor() {
    super('UserDB');
    this.version(1).stores({
      users: 'id'
    });
  }
}

export const db = new UserDB();
