import { Component, Ds } from 'ds-core';
import { DsRadioGroup } from './radio-group';

import style from './radio-item.scss';

@Component({
  select: 'ds-radio-item',
  style,
})
export class DsRadioItem extends HTMLElement {
  static get observedAttributes() {
    return ['size'];
  }

  private _value = '';

  get value() {
    return this._value;
  }

  set value(val: string) {
    this._value = val;
    this._render();
  }

  private _checked = false;

  get checked() {
    return this._checked;
  }

  set checked(val: boolean) {
    this._checked = val;
    this._render();
  }

  private getRadioGroup(): DsRadioGroup {
    /**
     * TODO(cqcpcqp) 通过dom来获取父元素 我总是妄想实现一种函数 比如 viewParent
     * radioGroup: RadioGroup = viewParent();
     */
    return this.closest('ds-radio-group') as DsRadioGroup;
  }

  constructor() {
    super();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this._render();
  }

  connectedCallback() {
    this.classList.add('ds-radio-item');
    this._render();
  }

  private _render() {
    Ds.render(this.render(), this.shadowRoot as any);
  }

  render() {
    const clickHandler = (e) => {
      const group = this.getRadioGroup();
      if (group && !this._checked) {
        group.value = this.value;
      }
    };

    return (
      <label className="radio-item" onClick={clickHandler}>
        <input type="radio" value={this.value} checked={this.checked} />
        <slot></slot>
      </label>
    );
  }
}
