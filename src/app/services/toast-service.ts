import { Injectable, signal } from '@angular/core';
import { ToastType } from '../types/toast-type';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  message = signal('');
  type = signal<ToastType>('success');
  visible = signal(false);

  show(msg: string, type: ToastType = 'success', duration = 2000) {
    this.message.set(msg);
    this.type.set(type);
    this.visible.set(true);

    setTimeout(() => this.visible.set(false), duration);
  }

  hide() {
    this.visible.set(false);
  }
}
