import { Component, Didact } from 'ds-core';

import style from './option.scss';

@Component({
  select: 'ds-option',
  template: `
    <template id="ds-option">
      <style>
        ${style}
      </style>
    </template>
  `,
})
export default class DsOption extends HTMLElement {
  static get observedAttributes() {
    return ['size', 'placeholder'];
  }

  private _value = '';

  get value() {
    return this._value;
  }

  set value(val: string) {
    if (this._value !== val) {
      this._value = val;
      this._render();
    }
  }

  shadow;

  connected = false;

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' });

    const template: HTMLTemplateElement = document.getElementById(
      'ds-option',
    ) as HTMLTemplateElement;
    const templateContent = template.content;

    this.shadow.appendChild(templateContent.cloneNode(true));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this._render();
  }

  connectedCallback() {
    this.classList.add('ds-option');
    this.connected = true;

    this._render();
  }

  private _render() {
    if (this.connected) {
      Didact.render(this.render(), this.shadow);
    }
  }

  render() {
    const handleClick = () => {
      const event = new CustomEvent('optionSelected', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(event);
    };

    return (
      <div className="select-option" onClick={handleClick}>
        <slot></slot>
      </div>
    );
  }
}
