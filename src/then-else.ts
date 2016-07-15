export class ThenElse<T>  {
  private done: boolean;
  private value: any;
  private failure: boolean;

  private thenCallbacks = new Array<(value: T) => void>();
  private elseCallbacks = new Array<(value: any) => void>();

  constructor(task: (resolve: (value: T) => void, reject: (reason: any) => void) => void) {
    this.done = false;
    this.value = null;
    this.failure = false;
    task(this.resolve, this.reject);
  }
  private resolve(value: T) {
    if (!this.done) {
      this.done = true;
      this.failure = false;
      this.value = value;
      for (let cb of this.thenCallbacks) cb(this.value);
    }
  }
  private reject(value: any) {
    if (!this.done) {
      this.done = true;
      this.failure = true;
      this.value = value;
      for (let cb of this.elseCallbacks) cb(this.value);
    }
  }

  then(callback: (value: T) => void) {
    if (!this.done) this.thenCallbacks.push(callback);
    else if (!this.failure) callback(this.value);
    return this;
  }
  else(callback: (result: any) => void) {
    if (!this.done) this.elseCallbacks.push(callback);
    else if (this.failure) callback(this.value);
    return this;
  }
}
