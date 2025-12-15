import { Component, Input } from '@angular/core';
import { Avatar } from '../../../shared/avatar/avatar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../../models/user';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from '../../../services/toast-service';
import { UserListService } from '../../../services/user-list-service';

@Component({
  selector: 'app-edit-user',
  imports: [Avatar, ReactiveFormsModule],
  templateUrl: './edit-user.html',
  styleUrl: './edit-user.css',
})
export class EditUser {
  @Input() userDetails!: User;
  editUserForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbModal,
    private service: UserListService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.editUserForm = this.fb.group({
      name: [this.userDetails.name, [Validators.required, Validators.maxLength(30)]],
      email: [this.userDetails.email, [Validators.required, Validators.email]],
      role: [this.userDetails.role, Validators.required],
    });
  }

  closeModal() {
    this.activeModal.dismissAll();
  }

  submit() {
    const data = this.editUserForm.value;
    data.id = this.userDetails.id;
    data.status = this.userDetails.status;
    this.service.updateUser(data);
    this.closeModal();
    this.toastService.show('User Details Updated Successfully!');
  }
}
