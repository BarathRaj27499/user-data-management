import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserListService } from '../../../services/user-list-service';
import { ToastService } from '../../../services/toast-service';

@Component({
  selector: 'app-add-user',
  imports: [ReactiveFormsModule],
  templateUrl: './add-user.html',
  styleUrl: './add-user.css',
})
export class AddUser implements OnInit {
  userForm!: FormGroup;

  constructor(private fb: FormBuilder, public activeModal: NgbModal, private service:UserListService, private toastService:ToastService) {}

  ngOnInit() {
	this.userForm = this.fb.group({
		name: ['', [Validators.required, Validators.maxLength(30)]],
		email:['', [Validators.required, Validators.email]],
		role:['', Validators.required]
	});
  }

  closeModal(){
    this.activeModal.dismissAll();
  }

  getNextId(): number {
    return this.service.users().length
      ? Math.max(...this.service.users().map(u => u.id)) + 1
      : 1;
  }

  submit(){
	const data = this.userForm.value;
	data.id = this.getNextId();
	data.status = 'Inactive'
	this.service.addUser(data);
	this.closeModal();
	this.toastService.show('User Created Successfully!');
  }
}
