import { ModalDialog } from './modal-dialog'
export interface ModalContent {
    onModalContentInit(modal: ModalDialog, parameters: any): void;
}
