import { Component } from '@angular/core';
import { User } from '../../../models/user';
import { UserListService } from '../../../services/user-list-service';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserDetails } from '../user-details/user-details';
import { Avatar } from '../../../shared/avatar/avatar';
import { AddUser } from '../add-user/add-user';
import { EditUser } from '../edit-user/edit-user';
import { DeleteConfirmation } from '../delete-confirmation/delete-confirmation';

@Component({
  selector: 'app-user-list',
  imports: [FormsModule, NgxPaginationModule, Avatar],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList {
  onPageSizeChange() {
    this.page = 1;
  }
  page = 1;
  searchText = '';
  selectedUser!: User;
  pageSize: number = 10;

  constructor(public service: UserListService, private modal: NgbModal) {}

  filteredUsers() {
    const usersList = this.service.users().filter((x) => {
      return (
        x.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        x.email.toLowerCase().includes(this.searchText.toLowerCase())
      );
    });
    return usersList;
  }

  openAddUserModal() {
    const modalRef = this.modal.open(AddUser, {
      centered: true,
      size: 'lg',
      backdrop: 'static',
    });
  }

  openUserDetails(user: User) {
    const modalRef = this.modal.open(UserDetails, {
      centered: true,
      size: 'md',
      backdrop: 'static',
    });
    modalRef.componentInstance.userDetails = user;
  }

  openEditUserModal(user: User) {
    const modalRef = this.modal.open(EditUser, {
      centered: true,
      size: 'md',
      backdrop: 'static',
    });
    modalRef.componentInstance.userDetails = user;
  }

  deleteUser(id: number) {
    const modalRef = this.modal.open(DeleteConfirmation, {
      centered: true,
      size: 'sm',
      backdrop: 'static',
    });
    modalRef.componentInstance.userId = id;
  }
}
