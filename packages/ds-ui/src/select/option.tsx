import { Component, Didact } from 'ds-core';

import style from './option.scss';

@Component({
  select: 'ds-option',
  style,
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

  constructor() {
    super();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this._render();
  }

  connectedCallback() {
    this.classList.add('ds-option');

    this._render();
  }

  private _render() {
    Didact.render(this.render(), this.shadowRoot as any);
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
