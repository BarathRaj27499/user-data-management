import { Injectable, signal } from '@angular/core';
import { User } from '../models/user';
import { DEFAULT_USERS } from '../constants/users.constants';
import { db } from '../db/user.db';

@Injectable({
  providedIn: 'root',
})
export class UserListService {
  private usersSignal = signal<User[]>([]);
  users = this.usersSignal.asReadonly();

  constructor() {
    this.init();
  }

  private async init() {
    const users = await db.users.toArray();

    if (users.length === 0) {
      await db.users.bulkAdd(DEFAULT_USERS);
      this.usersSignal.set(DEFAULT_USERS);
    } else {
      this.usersSignal.set(users);
    }
  }

  async addUser(user: User) {
    await db.users.add(user);
    this.usersSignal.set([...this.usersSignal(), user]);
  }

  async updateUser(updatedUser: User) {
    await db.users.put(updatedUser);
    const latestUsers = this.usersSignal().map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    this.usersSignal.set(latestUsers);
  }

  async deleteUser(id: number) {
    await db.users.delete(id);
    const latestUsers = this.usersSignal().filter((user) => user.id !== id);
    this.usersSignal.set(latestUsers);
  }
}
