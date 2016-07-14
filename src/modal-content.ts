export interface ModalContent {
    onContentInit(modal: ModalDialog, parameters: any): void;
}
export interface ModalDialog {
  dismiss(): void;
  close(result: any): void;
}
