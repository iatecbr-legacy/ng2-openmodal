export class ModalParams {
  componentType: any;
  title: string;
  contentParams: any;
  dismissable: (comp: any) => boolean = (x) => true;
}
