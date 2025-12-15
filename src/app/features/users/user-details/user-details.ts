import { Component, Input } from '@angular/core';
import { Avatar } from '../../../shared/avatar/avatar';
import { User } from '../../../models/user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-details',
  imports: [Avatar],
  templateUrl: './user-details.html',
  styleUrl: './user-details.css',
})
export class UserDetails {
  @Input() userDetails!:User;

  constructor(public activeModal: NgbModal){}

  closeModal(){
    this.activeModal.dismissAll();
  }
}
