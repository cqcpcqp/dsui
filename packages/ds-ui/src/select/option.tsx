import { Component, computed, Ds, inject, input, signal } from 'ds-core';

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

  $_size = computed(() => this.$dsSelectInstance()?.$_size() || 'md');

  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('ds-option');

    this.$dsSelectInstance.set(inject.call(this, selectInjectToken).instance);

    this.$dsSelectInstance().registerOption({
      label: this.textContent,
      value: this.$value(),
    });
  }

  handleClick() {
    this.$dsSelectInstance().selectOption(this.$value());
  }

  render() {
    return (
      <div
        className={`select-option ${this.$_size() ? 'select-option-' + this.$_size() : ''}`}
        onClick={this.handleClick}
      >
        <slot></slot>
      </div>
    );
  }
}
