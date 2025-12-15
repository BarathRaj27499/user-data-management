import { Component, Input } from '@angular/core';
import { UserListService } from '../../../services/user-list-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../../../services/toast-service';

@Component({
  selector: 'app-delete-confirmation',
  imports: [],
  templateUrl: './delete-confirmation.html',
  styleUrl: './delete-confirmation.css',
})
export class DeleteConfirmation {
  @Input() userId!:number;

  constructor(private service:UserListService, private activeModal:NgbModal, private toastService:ToastService){}

  deleteUser(){
      this.service.deleteUser(this.userId);
      this.closeModal();
      this.toastService.show("User Deleted Successfully!");
  }

  closeModal(){
    this.activeModal.dismissAll();
  }
}
