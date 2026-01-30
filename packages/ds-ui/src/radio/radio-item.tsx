import { Component, computed, Ds, inject, input, signal } from 'ds-core';
import { radioGroupInjectToken } from './radio-group';

import style from './radio-item.scss';

@Component({
  select: 'ds-radio-item',
  style,
})
export class DsRadioItem extends HTMLElement {
  $value = input('', { alias: 'value' });

  $radioCtx = signal();

  $formCtx = signal();

  $size = computed(() => this.$radioCtx()?.$size?.());

  $checked = computed(() => this.$radioCtx()?.$value() === this.$value());

  $name = computed(() => this.$radioCtx()?.$name());

  $type = computed(() => this.$radioCtx()?.$type?.());

  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('ds-radio-item');

    this.$radioCtx.set(inject.call(this, radioGroupInjectToken));

    this.$radioCtx().registerItem(this);
  }

  disconnectedCallback() {
    this.$radioCtx().unregisterItem(this);
  }

  clickHandler(e) {
    this.$radioCtx().$value.set(this.$value());
  }

  render() {
    const type = this.$type();
    const checkedClass = this.$checked() ? ' radio-item-checked' : '';
    const size = this.$size();

    // 直接使用 host 上的 class 命名
    const typeClass = type ? 'radio-item-' + type : '';
    const sizeClass = size ? 'radio-item-' + size : '';

    return (
      <label
        className={`radio-item ${sizeClass} ${typeClass} ${checkedClass}`}
        onClick={this.clickHandler}
      >
        <input name={this.$name()} type="radio" value={this.$value()} checked={this.$checked()} />
        <slot></slot>
      </label>
    );
  }
}
