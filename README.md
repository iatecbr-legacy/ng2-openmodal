ng2-openmodal [![npm version](https://badge.fury.io/js/ng2-openmodal.svg)](https://badge.fury.io/js/ng2-openmodal)
======================
A customizable modal for Angular 2


It uses the Bootstrap modal by default. You can also provide a custom modal view.

## Features List
- [x] Default bootstrap modal layout
- [x] Customizable modal layout
- [x] Alert dialog
- [x] Customizable Alert component
- [x] Confirmation dialog
- [x] Customizable Confirmation component
- [x] Dialog result callback
- [x] Dialog dismiss callback
- [x] Dismiss validation
- [ ] Good documentation

## Basic Usage
1. Install the package `ng2-openmodal`
```bash
npm install --save ng2-openmodal
```
1. Add entries in the file `systemjs.config.js`
```
...

var map = {
  ...
  // Here it goes!
  'ng2-openmodal':              'node_modules/ng2-openmodal',
  ...
};

var packages = {
  ...
  'ng2-openmodal':              { main: 'index.js', defaultExtension: 'js' },
  ...
};
```
1. Set the modal placement, e.g.
```typescript
import { ModalService } from 'ng2-openmodal';

...

@ViewChild('modalPlacement', {read: ViewContainerRef}) modalPlacement: ViewContainerRef;

...

this.modalService.setPlacement(this.modalPlacement);
```
1. Invoke `ModalService.openModal`. **TODO** Improve documentation
1. Enjoy it!

## **TODO** Documentation of Modal response
### **TODO** documentation of the `ThenElse` class

## **TODO** Additional features

## `ModalService` methods
- **TODO** documentation of `setModalLayout(type)`:
- **TODO** documentation of `setAlertComponent(type)`:
- **TODO** documentation of `setConfirmComponent(type)`:
- **TODO** documentation of `setPlacement(container: ViewContainerRef)`:
- **TODO** documentation of `openModal(componentType: any, title: string, contentParams?: any): ThenElse<any>`
