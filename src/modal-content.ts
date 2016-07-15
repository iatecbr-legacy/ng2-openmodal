import { ModalDialog } from './modal-dialog'
export interface ModalContent {
    onContentInit(modal: ModalDialog, parameters: any): void;
}
