import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  imports: [],
  templateUrl: './avatar.html',
  styleUrl: './avatar.css',
})
export class Avatar {
  @Input() name = '';
  @Input() src = '';
  @Input() size = 40;

  textColor = '#FFFFFF'; // always white

  private readonly palette = [
    '#1abc9c',
    '#2ecc71',
    '#3498db',
    '#9b59b6',
    '#e67e22',
    '#e74c3c',
    '#f39c12',
    '#16a085',
    '#2980b9',
    '#8e44ad',
    '#d35400',
    '#c0392b',
  ];

  get fontSize(): number {
    return Math.floor(this.size * 0.5);
  }

  get initials(): string {
	if (!this.name) return '';
    const parts = this.name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  get bgColor(): string {
    if (!this.name) return this.palette[0];
    let hash = 0;
    for (let i = 0; i < this.name.length; i++) {
      hash = this.name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % this.palette.length;
    return this.palette[index];
  }
}
