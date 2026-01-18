import { Component, Ds, effect, inject, input, signal } from 'ds-core';

import style from './option.scss';
import { selectInjectToken } from './select';

@Component({
  select: 'ds-option',
  style,
})
export class DsOption extends HTMLElement {
  static get observedAttributes() {
    return ['size', 'placeholder'];
  }

  $value = input('', { alias: 'value' });

  $dsSelectInstance = signal();

  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('ds-option');

    this.$dsSelectInstance.set(inject.call(this, selectInjectToken).instance);

    effect(() => {
      this._render();
    });
  }

  private _render() {
    Ds.render(this.render(), this.shadowRoot as any);
  }

  handleClick() {
    this.$dsSelectInstance().selectOption(this.$value());
  }

  render() {
    return (
      <div className="select-option" onClick={this.handleClick}>
        <slot></slot>
      </div>
    );
  }
}
