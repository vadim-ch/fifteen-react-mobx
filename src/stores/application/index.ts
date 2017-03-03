import { observable, action, computed, useStrict } from 'mobx';

useStrict(true);

export class ApplicationStore {

  // изменяемые значения за которыми следит mobx
  @observable private started;
  @observable private authorized;

  constructor() {
    this.started = false;
    this.authorized = false;
  }

  get isAutorized() {
    return this.authorized;
  }

  @computed get authName() {
    return this.authorized + `Вася`;
  }

  // методы для изменения стора
  @action public authorize () {
    this.authorized = true;
  }

  @action public reset () {
    this.authorized = false;
  }
}

const applicationStore = new ApplicationStore();
export default applicationStore;
