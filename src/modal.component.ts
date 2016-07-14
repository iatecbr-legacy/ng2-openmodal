import { Component, DynamicComponentLoader, ViewChild, ViewContainerRef, Injector, ElementRef, EventEmitter, Output } from '@angular/core';
import { ModalContent, ModalDialog } from './modal-content';
// import { ModalParams } from './modal-params';

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
  show(modalParams: ModalParams) {
    console.warn('aqui', modalParams);
    this.title = modalParams.title;
    this.dismissable = modalParams.dismissable;
    this.componentLoader.loadNextToLocation(modalParams.componentType, this.contentPlacement)
        .then(comp => {
          // TODO: Checks if implements the interface
          let modalContent = <ModalContent>comp.instance;
          modalContent.onContentInit(this, modalParams.contentParameters);
          this.dismiss = () => {
            if (this.dismissable(modalContent)) this.internalDismiss();
          }
          this.visible = true;
        });
  }
  private internalDismiss() {
    console.log('Dismissou');
    this.visible = false;
    this.closed.emit(ModalResult.failure('Modal dismissed.', this.timeBeforeDestroy));
  }
  close(result: any) {
    this.visible = false;
    this.closed.emit(ModalResult.success(result, this.timeBeforeDestroy));
  }
  @Output() closed: EventEmitter<ModalResult> = new EventEmitter<ModalResult>();

}

export class ModalResult {
  success: boolean;
  value: any;
  timeBeforeDestroy: number;
  constructor(success: boolean, value: any, timeBeforeDestroy: number = 0) {
    this.success = success;
    this.value = value;
    this.timeBeforeDestroy = timeBeforeDestroy;
  }
  static success(value: any, timeBeforeDestroy: number = 0) {
    let result = new ModalResult(true, value, timeBeforeDestroy);
    return result;
  }
  static failure(reason: any = null, timeBeforeDestroy: number = 0) {
    let result = new ModalResult(false, reason, timeBeforeDestroy);
    return result;
  }
}

export class ModalParams {
  componentType: any;
  title: string;
  contentParameters: any;
  dismissable: (comp: any) => boolean = (x) => true;
}
