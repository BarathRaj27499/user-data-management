import { Injectable, signal } from '@angular/core';
import { User } from '../models/user';
import { DEFAULT_USERS } from '../constants/users.constants';
@Injectable({
  providedIn: 'root',
})
export class UserListService {
  private usersSignal = signal<User[]>(this.initData());
  users = this.usersSignal.asReadonly();
  private initData(): User[] {
    const data = localStorage.getItem('users');
    if (data) {
      return JSON.parse(data);
    }
    localStorage.setItem('users', JSON.stringify(DEFAULT_USERS));
    return DEFAULT_USERS;
  }

  private save(data: User[]) {
    localStorage.setItem('users', JSON.stringify(data));
    this.usersSignal.set(data);
    console.log(this.users());
  }

  addUser(user: User) {
    const latestUsers = this.usersSignal();
    this.save([...latestUsers, user]);
  }

  updateUser(updatedUser: User) {
    const latestUsers = this.usersSignal().map((user) => {
      return user.id === updatedUser.id ? updatedUser : user;
    });
    this.save(latestUsers);
  }

  deleteUser(id: number) {
    const latestUsers = this.usersSignal().filter((user) => user.id !== id);
    this.save(latestUsers);
  }

  getUserById(id: number) {
    return this.usersSignal().find((user) => user.id === id);
  }
}
