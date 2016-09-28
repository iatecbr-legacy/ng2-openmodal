import { Component } from '@angular/core';
import { ModalContent } from './modal-content';
import { ModalDialog } from './modal-dialog';

@Component({
  moduleId: module.id,
  selector: 'ng2-openmodal-confirm',
  templateUrl: 'modal-confirmation.component.html'
})
export class ModalConfirmationComponent implements ModalContent {
  modal: ModalDialog;
  message: string;
  onModalContentInit(modal: ModalDialog, parameters: any) {
    this.modal = modal;
    if ('message' in parameters) {
      this.message = parameters.message;
    }
  }
}
