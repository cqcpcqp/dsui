// Require Signal
export class SelectionModel<T> {
  private _selection = new Set<T>();

  private _deselectedToEmit: T[] = [];

  private _selectedToEmit: T[] = [];

  private _selected: T[] | null;

  get selected(): T[] {
    return this._selected;
  }

  // TODO(cqcpcqp) Remove
  // 假设我们用signal来实现 selectionModel，那么是不会有changed这样的事件出现的。
  // 外部使用可能就是 showList = () => this.selectionModel.selected().map(some function)
  // 值的变更会通过类似effect或者computed来作用在其他值或者视图上
  // 不需要对这次变更在selectionModel内手动的触发一次changed事件

  // readonly changed = new Subject()

  constructor(
    private _multiple = false,
    initiallySelectedValues?: T[],
    private _emitChanges = true,
    public compareWith?: (o1: T, o2: T) => boolean,
  ) {}

  select(...values: T[]): boolean | void {}

  deselect(...values: T[]): boolean | void {}

  setSelection(...values: T[]): boolean | void {}

  toggle(value: T): boolean | void {}

  clear(): boolean | void {}

  isSelected(value: T): boolean {
    return this._selection.has(value);
  }

  isEmpty(): boolean {
    return this._selection.size === 0;
  }

  hasValue(): boolean {
    return !this.isEmpty();
  }

  sort(): void {}
}

export interface SelectionChange<T> {
  source: SelectionModel<T>;
  added: T[];
  removed: T[];
}

Promise.resolve().then((data) => {});
