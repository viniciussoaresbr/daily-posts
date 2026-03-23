import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
})
export class ModalConfirmComponent {
  @Input() message = 'Tem certeza que deseja excluir este item?';
  @Output() onConfirm = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();
}
