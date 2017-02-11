import { observable, action, computed, useStrict } from 'mobx';
useStrict(true);

const MAX_SIZE = 10;

export enum Move {
  Up,
  Down,
  Left,
  Right
}

const INDEX_SIDE = {
  [Move.Up]: 4,
  [Move.Down]: -4,
  [Move.Left]: 1,
  [Move.Right]: -1
};

export class PlayStore {

  @observable private size: number = 4;
  @observable public fields: Array<number> = [];
  private indexZero: number;

  constructor() {
    this.init();
  }

  @computed get isCompleted(): boolean {
    return this.fields.every((field, i) => field === i);
  }

  @computed get isSolved(): boolean {
    return true;
  }

  // методы для изменения стора
  @action public changeSize(size: number): void {
    if (size < this.size) {
      size = this.size;
    }
    if (size > MAX_SIZE) {
      size = MAX_SIZE;
    }
    this.size = size;
  }

  @action public init() {
    this.createFields();
    if (this.isSolved) {
      this.swapFields(0, 1);
    }
    this.indexZero = this.findZero();
  }

  @action public move(move: Move): void {
    const indexMove = this.indexZero + INDEX_SIDE[move];
    // if (indexMove >= 0 && indexMove < this.fields.length) {
    if (this.fields[indexMove] && this.isAvailableMove(move, indexMove, this.indexZero)) {
      this.swapFields(indexMove, this.indexZero);
      this.indexZero = indexMove;
    }
  }

  private createFields(): void {
    this.fields.length = Math.pow(this.size, 2);
    this.fields = this.fields.map((field, i) => i).sort(() => Math.random() - 0.5);
  }

  private findZero(): number {
    return this.fields.findIndex((field: number) => field === 0);
  }

  private swapFields(prevIndex: number, nextIndex: number): void {
    const temp = this.fields[prevIndex];
    this.fields[prevIndex] = this.fields[nextIndex];
    this.fields[nextIndex] = temp;
  }

  private isAvailableMove(move: Move, index: number, indexZero: number): boolean {
    return !((move === Move.Left || move === Move.Right) &&
      Math.floor(index / this.size) !== Math.floor(indexZero / this.size));
  }
}

const playStore = new PlayStore();
export default playStore;
