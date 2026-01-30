import {
  Component,
  computed,
  createInjectToken,
  inject,
  input,
  model,
  provide,
  signal,
} from 'ds-core';
import { formInjectToken } from '../form/form';

import style from './radio-group.scss';

export const radioGroupInjectToken = createInjectToken('radio-group');

@Component({
  select: 'ds-radio-group',
  style,
  template: `<slot></slot>`,
})
export class DsRadioGroup extends HTMLElement {
  $value = model();

  $size = input(null, { alias: 'size' });

  $name = input(null, { alias: 'name' });

  $type = input('text', { alias: 'type' });

  $formCtx = signal();

  $_size = computed(() => this.$size() || this.$formCtx()?.$size() || 'md');

  constructor() {
    super();

    provide.call(this, radioGroupInjectToken, {
      $value: this.$value,
      $size: this.$_size,
      $name: this.$name,
      $type: this.$type,
    });
  }

  connectedCallback() {
    this.classList.add('ds-radio-group');

    // 根据 type 添加对应 class
    const type = this.$type();
    if (type && type !== 'text') {
      this.classList.add(`ds-radio-group-${type}`);
    }

    this.$formCtx.set(inject.call(this, formInjectToken));
  }
}
