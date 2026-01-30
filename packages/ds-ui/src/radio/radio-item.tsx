import { Component, computed, Ds, inject, input, signal } from 'ds-core';
import { radioGroupInjectToken } from './radio-group';

import style from './radio-item.scss';

/**
 * TODO(cqcpcqp)
 * button group
 * slider group
 * custom group
 * 使用selection-model来做
 * 人家还支持上下左右按钮切换呢
 */

@Component({
  select: 'ds-radio-item',
  style,
})
export class DsRadioItem extends HTMLElement {
  $value = input('', { alias: 'value' });

  $radioCtx = signal();

  $formCtx = signal();

  $size = computed(() => this.$radioCtx()?.$size());

  $checked = computed(() => this.$radioCtx()?.$value() === this.$value());

  $name = computed(() => this.$radioCtx()?.$name());

  $type = computed(() => this.$radioCtx()?.$type());

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
    const typeClass = this.$type() ? 'radio-item-' + this.$type() : '';
    const checkedClass = this.$checked() ? ' radio-item-checked' : '';
    const sizeClass = this.$size() ? 'radio-item-' + this.$size() : '';

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
