import { NgModule }       from '@angular/core';
import { ModalComponent }   from './modal.component';
import { ModalAlertComponent } from './modal-alert.component';
import { ModalConfirmationComponent } from './modal-confirmation.component';

@NgModule({
    declarations: [ ModalComponent, ModalAlertComponent, ModalConfirmationComponent ],
    exports: [ ModalComponent, ModalAlertComponent, ModalConfirmationComponent ],
})
export class Ng2OpenModalModule {}
