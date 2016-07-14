import { OnInit, Injectable, Injector, ViewContainerRef, ViewChild, DynamicComponentLoader } from "@angular/core";
import { ModalComponent, ModalResult, ModalParams } from './modal.component';
// import { ModalParams } from './modal-params'

@Injectable()
export class ModalService {

    private container: ViewContainerRef;
    private modals: ModalComponent[] = new Array<ModalComponent>();
    private modalComponentType: any = ModalComponent;
    constructor(private dynamicComponentLoader: DynamicComponentLoader, injector: Injector) {

    }
    setModalComponentType(modalComponentType: any) {
      this.modalComponentType = modalComponentType;
    }
    registerPlacement(container: ViewContainerRef) {
        this.container = container;
    }
    showModal(componentType: any, title: string, contentParameters: any = {}): Promise<any> {
      let params = new ModalParams();
      params.componentType = componentType;
      params.title = title;
      params.contentParameters = contentParameters;
      return this.showModalAdvanced(params);
    }
    showModalAdvanced(modalParams: ModalParams): Promise<any> {
      let promise = new Promise((resolve, reject) => {
        this.dynamicComponentLoader.loadNextToLocation(this.modalComponentType, this.container).then(comp => {
          let modal = <ModalComponent>comp.instance;
          modal.closed.subscribe((result: any) => {
            if (result.success) resolve(result.value);
            else reject(result.value);
            setTimeout(()=> comp.destroy(), result.timeBeforeDestroy);
          });
          this.modals.push(modal);
          modal.show(modalParams);
        });
      });
      return promise;
    }
    dismissAll() {
      let temp = this.modals;
      for (let modal of temp) {
        modal.dismiss();
      }
    }
}
