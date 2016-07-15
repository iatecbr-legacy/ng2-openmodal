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
