import { Component, Didact } from 'ds-core';

import style from './radio-group.scss';

import DsRadioItem from './radio-item';

@Component({
  select: 'ds-radio-group',
  template: `
    <template id="ds-radio-group">
      <style>
        ${style}
      </style>
      <slot></slot>
    </template>
  `,
})
export default class DsRadioGroup extends HTMLElement {
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

  shadow;

  radioItems: DsRadioItem[] = [];

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' });

    const template: HTMLTemplateElement = document.getElementById(
      'ds-radio-group',
    ) as HTMLTemplateElement;
    const templateContent = template.content;

    this.shadow.appendChild(templateContent.cloneNode(true));

    const slot = this.shadowRoot.querySelector('slot');
    slot.addEventListener('slotchange', (e) => {
      const nodes = slot.assignedNodes();
      this.radioItems = nodes.filter((node) => node instanceof DsRadioItem) as DsRadioItem[];
      this.updateRadioItemChecked();
    });
  }

  updateRadioItemChecked() {
    this.radioItems.forEach((radioItem) => {
      radioItem.checked = radioItem.value === this.value;
    });
  }

  connectedCallback() {
    // TODO(cqcpcqp) 感觉这个connectedCallback不够用呢，是不是要等render结束之后再给个生命周期？
    this.classList.add('ds-radio-group');
  }
}
