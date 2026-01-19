import { Component, computed, Ds, effect, inject, input, signal } from 'ds-core';
import { radioGroupInjectToken } from './radio-group';

import style from './radio-item.scss';

@Component({
  select: 'ds-radio-item',
  style,
})
export class DsRadioItem extends HTMLElement {
  static get observedAttributes() {
    return ['size'];
  }

  $value = input('', { alias: 'value' });

  $radioCtx = signal();

  $checked = computed(() => {
    return this.$radioCtx()?.$value() === this.$value();
  });

  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('ds-radio-item');

    this.$radioCtx.set(inject.call(this, radioGroupInjectToken));
  }

  clickHandler(e) {
    this.$radioCtx().$value.set(this.$value());
  }

  render() {
    return (
      <label className="radio-item" onClick={this.clickHandler}>
        <input type="radio" value={this.$value()} checked={this.$checked()} />
        <slot></slot>
      </label>
    );
  }
}
