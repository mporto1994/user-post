import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.css']
})
export class ModalComponent {
  @Input() showModal = false;

  closeModal(): void {
    this.showModal = false;
  }

  save(): void {
    this.closeModal();
  }
}
