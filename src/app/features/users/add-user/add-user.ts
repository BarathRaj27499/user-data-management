import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserListService } from '../../../services/user-list-service';
import { ToastService } from '../../../services/toast-service';
import { CommonModule } from '@angular/common';
import { ProfilePicUpdate } from '../../../shared/profile-pic-update/profile-pic-update';

@Component({
  selector: 'app-add-user',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-user.html',
  styleUrl: './add-user.css',
})
export class AddUser implements OnInit {
  userForm!: FormGroup;
  imagePreview = signal<string | null>(null);

  constructor(
    private fb: FormBuilder,
    public modalService: NgbModal,
    private service: UserListService,
    private toastService: ToastService,
  ) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      avatar: [null],
    });
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  getNextId(): number {
    return this.service.users().length ? Math.max(...this.service.users().map((u) => u.id)) + 1 : 1;
  }

  submit() {
    const data = this.userForm.value;
    data.id = this.getNextId();
    data.status = 'Inactive';
    this.service.addUser(data);
    this.closeModal();
    this.toastService.show('User Created Successfully!');
  }

  removePic() {
    this.imagePreview.set(null);
    this.userForm.patchValue({ avatar: null });
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
      this.userForm.patchValue({ avatar: photo });
    });
  }
}
