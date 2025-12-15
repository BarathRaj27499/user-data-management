import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:'', redirectTo: 'users', pathMatch:'full'},
    {path:'users', loadComponent: () => import('./features/users/user-list/user-list').then(m => m.UserList)},
];
