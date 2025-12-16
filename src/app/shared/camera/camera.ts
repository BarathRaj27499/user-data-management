import { Component, ElementRef, EventEmitter, Output, signal, ViewChild } from '@angular/core';

@Component({
  selector: 'app-camera',
  imports: [],
  templateUrl: './camera.html',
  styleUrl: './camera.css',
})
export class Camera {
  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;
  @Output() photoSelected = new EventEmitter<string | null>();
  private stream!: MediaStream;
  private facingMode: 'user' | 'environment' = 'environment';
  photoPreview = signal<string | null>(null);

  ngAfterViewInit() {
    this.startCamera();
  }

  ngOnDestroy() {
    this.stopCamera();
  }

  private async startCamera() {
    this.stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: this.facingMode },
    });
    this.video.nativeElement.srcObject = this.stream;
  }

  private stopCamera() {
    this.stream?.getTracks().forEach((track) => track.stop());
  }

  switchCamera() {
    this.stopCamera();
    this.facingMode = this.facingMode === 'user' ? 'environment' : 'user';
    this.startCamera();
  }

  capturePhoto() {
    const canvas = document.createElement('canvas');
    canvas.width = this.video.nativeElement.videoWidth;
    canvas.height = this.video.nativeElement.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(this.video.nativeElement, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg');
    this.photoPreview.set(dataUrl);
    this.stopCamera();
  }

  confirmPhoto() {
    if (this.photoPreview()) {
      this.photoSelected.emit(this.photoPreview());
    }
  }

  removePhoto() {
    this.photoPreview.set(null);
    this.startCamera();
  }

  closeModal(){
    this.stopCamera();
    this.photoSelected.emit(null);
  }
}
