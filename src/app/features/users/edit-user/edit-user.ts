import { Component, Input, signal } from '@angular/core';
import { Avatar } from '../../../shared/avatar/avatar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../../models/user';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from '../../../services/toast-service';
import { UserListService } from '../../../services/user-list-service';
import { ProfilePicUpdate } from '../../../shared/profile-pic-update/profile-pic-update';

@Component({
  selector: 'app-edit-user',
  imports: [Avatar, ReactiveFormsModule],
  templateUrl: './edit-user.html',
  styleUrl: './edit-user.css',
})
export class EditUser {
  @Input() userDetails!: User;
  editUserForm!: FormGroup;
  imagePreview = signal<string | null>(null);

  constructor(
    private fb: FormBuilder,
    public modalService: NgbModal,
    private service: UserListService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.editUserForm = this.fb.group({
      name: [this.userDetails.name, [Validators.required, Validators.maxLength(30)]],
      email: [this.userDetails.email, [Validators.required, Validators.email]],
      role: [this.userDetails.role, Validators.required],
      avatar:[null]
    });
  }

  removePic() {
    this.imagePreview.set(null);
    this.editUserForm.patchValue({ avatar: null });
  }

  openUpdateModal() {
    const modalRef = this.modalService.open(ProfilePicUpdate, {
      centered: true,
      size: 'md',
      backdrop: 'static',
    });
    modalRef.componentInstance.photoSelected.subscribe((photo: string) => {
      modalRef.close();
      this.imagePreview.set(photo);
      this.editUserForm.patchValue({ avatar: photo });
    });
  }

  closeModal() {
    this.modalService.dismissAll();
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
