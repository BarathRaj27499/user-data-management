import { Component, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Camera } from '../camera/camera';

@Component({
  selector: 'app-profile-pic-update',
  imports: [],
  templateUrl: './profile-pic-update.html',
  styleUrl: './profile-pic-update.css',
})
export class ProfilePicUpdate {
  @Output() photoSelected = new EventEmitter<string>();

  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal) {}

  openCamera() {
    const cameraModalRef = this.modalService.open(Camera, { size: 'lg' });
    cameraModalRef.componentInstance.photoSelected.subscribe((photo: string) => {
      if (photo) {
        this.photoSelected.emit(photo);
      }
      cameraModalRef.close();
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        this.photoSelected.emit(reader.result as string);
        this.activeModal.close();
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
}
