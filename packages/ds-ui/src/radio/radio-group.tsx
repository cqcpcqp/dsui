import { Component, createInjectToken, model, provide } from 'ds-core';

import style from './radio-group.scss';

export const radioGroupInjectToken = createInjectToken('radio-group');

@Component({
  select: 'ds-radio-group',
  style,
  template: `<slot></slot>`,
})
export class DsRadioGroup extends HTMLElement {
  static get observedAttributes() {
    return ['size'];
  }

  $value = model();

  constructor() {
    super();

    provide.call(this, radioGroupInjectToken, {
      $value: this.$value,
    });
  }

  connectedCallback() {
    this.classList.add('ds-radio-group');
  }
}
