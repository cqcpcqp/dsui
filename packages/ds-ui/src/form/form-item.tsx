import { Component, computed, Ds, inject, input, signal } from 'ds-core';
import { formInjectToken } from './form';
import style from './form-item.scss';

@Component({
  select: 'ds-form-item',
  style,
})
export class DsFormItem extends HTMLElement {
  $label = input('', { alias: 'label' });

  $size = input('md', { alias: 'size' });

  $labelAlign = input('right', { alias: 'labelAlign' });

  $labelFlex = input('', { alias: 'labelFlex' });

  $inputFlex = input('', { alias: 'inputFlex' });

  $formCtx = signal();

  $_labelFlex = computed(() => {
    return this.$labelFlex() || this.$formCtx()?.$labelFlex() || undefined;
  });

  $_inputFlex = computed(() => {
    return this.$inputFlex() || this.$formCtx()?.$inputFlex() || undefined;
  });

  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('ds-form-item');

    this.$formCtx.set(inject.call(this, formInjectToken));
  }

  render() {
    const labelFlex = this.$_labelFlex();
    const inputFlex = this.$_inputFlex();

    return (
      <div className="form-item">
        <label className="form-item-label" style={{ flex: labelFlex }}>
          <span className="form-item-label-required">*</span>
          {this.$label()}
        </label>
        <div className="form-item-body" style={{ flex: inputFlex }}>
          <slot></slot>
        </div>
      </div>
    );
  }
}
