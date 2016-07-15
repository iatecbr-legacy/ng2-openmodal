import { Component, DynamicComponentLoader, ViewChild, ViewContainerRef, Injector, ElementRef, EventEmitter, Output } from '@angular/core';
import { ModalContent } from './modal-content';
import { ModalDialog } from './modal-dialog';
import { ModalParams } from './modal-params';
import { ModalResult } from './modal-result';

@Component({
  selector: 'app-modal',
  templateUrl: 'modal.component.html',
  styleUrls: ['modal.component.css']
})
export class ModalComponent implements ModalDialog {
  title = "Title";
  visible = false;
  dismissable: (comp: any) => boolean = (x) => true;
  dismiss: () => void;
  timeBeforeDestroy: number = 500;
  @ViewChild('contentPlacement', {read: ViewContainerRef}) contentPlacement: ViewContainerRef;

  constructor(private componentLoader: DynamicComponentLoader) {
  }
  open(modalParams: ModalParams) {
    this.title = modalParams.title;
    this.dismissable = modalParams.dismissable;
    this.componentLoader.loadNextToLocation(modalParams.componentType, this.contentPlacement)
        .then(comp => {
          // TODO: Checks if implements the interface
          let modalContent = <ModalContent>comp.instance;
          modalContent.onContentInit(this, modalParams.contentParams);
          this.dismiss = () => {
            if (this.dismissable(modalContent)) this.internalDismiss();
          }
          this.visible = true;
        });
  }
  private internalDismiss() {
    this.visible = false;
    this.closed.emit(ModalResult.failure('Modal dismissed.', this.timeBeforeDestroy));
  }
  close(result: any) {
    this.visible = false;
    this.closed.emit(ModalResult.success(result, this.timeBeforeDestroy));
  }
  @Output() closed: EventEmitter<ModalResult> = new EventEmitter<ModalResult>();

}
