import { Component, computed, Ds, effect, inject, input, model, signal } from 'ds-core';
import { formInjectToken } from '../form/form';

import style from './input-area.scss';

@Component({
  select: 'ds-input-area',
  style,
})
export class DsInputArea extends HTMLElement {
  $placeholder = input('', { alias: 'placeholder' });

  $value = model<string>('');

  $size = input(null, { alias: 'size' });

  $rows = input(3, { alias: 'rows' });

  $maxlength = input(null, { alias: 'maxlength' });

  $formCtx = signal();

  $_size = computed(() => this.$size() || this.$formCtx()?.$size() || 'md');

  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('ds-input-area');

    this.$formCtx.set(inject.call(this, formInjectToken));
  }

  handleChange(e) {
    this.$value.set(e.target.value);
  }

  render() {
    return (
      <div className={`input-group ${this.$_size() ? 'input-group-' + this.$_size() : ''}`}>
        <textarea
          placeholder={this.$placeholder()}
          rows={this.$rows()}
          maxLength={this.$maxlength() ?? undefined}
          onInput={this.handleChange}
        >
          {/**
           * 在标签间默认输入的内容。<textarea> 不支持 value 属性
           */}
          {this.$value()}
        </textarea>
      </div>
    );
  }
}
