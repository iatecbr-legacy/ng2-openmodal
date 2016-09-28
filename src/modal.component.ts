import { Component, ViewChild, ViewContainerRef, EventEmitter, Output, ComponentFactoryResolver } from '@angular/core';
import { ModalContent } from './modal-content';
import { ModalDialog } from './modal-dialog';
import { ModalParams } from './modal-params';
import { ModalResult } from './modal-result';

@Component({
  moduleId: module.id,
  selector: 'ng2-openmodal',
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

  constructor(private resolver: ComponentFactoryResolver) {
  }
  open(modalParams: ModalParams) {
    this.title = modalParams.title;
    this.dismissable = modalParams.dismissable;

    let modalContentFactory = this.resolver.resolveComponentFactory(modalParams.componentType)
    let contentRef = this.contentPlacement.createComponent(modalContentFactory);
    let content = <ModalContent>contentRef.instance;

    // TODO: Checks if implements the interface
    content.onModalContentInit(this, modalParams.contentParams);
    this.dismiss = () => {
      if (this.dismissable(content)) this.internalDismiss();
    }
    this.visible = true;
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
