import { observable, action, computed, useStrict } from 'mobx';
useStrict(true);

const MAX_SIZE = 10;

export class PlayStore {

  @observable private size: number = 4;
  @observable private fields: Array<number> = [];

  constructor() {
    this.init();
  }

  public getFields() {
    return this.fields;
  }

  // методы для изменения стора
  @action public changeSize(size: number) {
    if (size < 0) {
      size = 0;
    }
    if (size > MAX_SIZE) {
      size = MAX_SIZE;
    }
    this.size = size;
  }

  @action private init() {

  }
}

const playStore = new PlayStore();
export default playStore;
