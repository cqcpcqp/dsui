import { Component, createInjectToken, effect, input, provide } from 'ds-core';
import style from './form.scss';

export const formInjectToken = createInjectToken('form');

@Component({
  select: 'ds-form',
  style,
  template: '<slot></slot>',
})
export class DsForm extends HTMLElement {
  $labelFlex = input('', { alias: 'labelFlex' });

  $inputFlex = input('', { alias: 'inputFlex' });

  $size = input('md', { alias: 'size' });

  constructor() {
    super();

    provide.call(this, formInjectToken, {
      $labelFlex: this.$labelFlex,
      $inputFlex: this.$inputFlex,
      $size: this.$size,
    });
  }

  connectedCallback() {
    this.classList.add('ds-form');
  }
}
