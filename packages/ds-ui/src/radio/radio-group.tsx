import { Component } from 'ds-core';

import style from './radio-group.scss';

import { DsRadioItem } from './radio-item';

@Component({
  select: 'ds-radio-group',
  style,
  template: `<slot></slot>`,
})
export class DsRadioGroup extends HTMLElement {
  static get observedAttributes() {
    return ['size'];
  }

  private _value = '';

  get value() {
    return this._value;
  }

  set value(val: string) {
    this._value = val;
    /**
     * The current design is to render anyway. In theory, only the content coming in from the outside
     * should be rendered, and the content inside should not be rendered.
     */
    this.updateRadioItemChecked();
  }

  radioItems: DsRadioItem[] = [];

  constructor() {
    super();
  }

  updateRadioItemChecked() {
    this.radioItems.forEach((radioItem) => {
      radioItem.checked = radioItem.value === this.value;
    });
  }

  connectedCallback() {
    const slot = this.shadowRoot.querySelector('slot');
    slot.addEventListener('slotchange', (e) => {
      const nodes = slot.assignedNodes();
      this.radioItems = nodes.filter((node) => node instanceof DsRadioItem) as DsRadioItem[];
      this.updateRadioItemChecked();
    });
    // TODO(cqcpcqp) 感觉这个connectedCallback不够用呢，是不是要等render结束之后再给个生命周期？
    this.classList.add('ds-radio-group');
  }
}
