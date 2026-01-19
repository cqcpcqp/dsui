import { Component, createInjectToken, Ds, effect, input, model, provide, signal } from 'ds-core';
import { Mask } from 'ds-headless';

import style from './select.scss';

export const selectInjectToken = createInjectToken('select');

@Component({
  select: 'ds-select',
  style,
  template: `
    <!-- select组件中用到的svg -->
    <svg aria-hidden="true" style="position: absolute; width: 0px; height: 0px; overflow: hidden;">
      <symbol id="icon-up" viewBox="0 0 1024 1024">
        <path
          d="M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3c-3.8 5.3-0.1 12.7 6.5 12.7h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1 391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z"
        ></path>
      </symbol>
      <symbol id="icon-down" viewBox="0 0 1024 1024">
        <path
          d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3 0.1-12.7-6.4-12.7z"
        ></path>
      </symbol>
    </svg>
  `,
})
export class DsSelect extends HTMLElement {
  static get observedAttributes() {
    return ['size'];
  }

  $value = model(undefined);

  $placeholder = input('', { alias: 'placeholder' });

  $open = signal(false);

  mask: Mask;

  constructor() {
    super();

    provide.call(this, selectInjectToken, {
      instance: this,
    });
  }

  connectedCallback() {
    this.classList.add('ds-select');
  }

  handleClick() {
    this.$open.set(true);
  }

  handleChange() {}

  selectOption(value) {
    this.$value.set(value);
    this.$open.set(false);
    this.mask?.destroy();

    /**
     * 手动触发一个input时间来通知Vue值已改变
     * Q&A:
     * 为什么input.tsx中就不需要dispatch一个event出去？
     * 因为input.tsx是直接在原生input里面进行输入的，本身就会触发原生时间，Vue感知的到
     */
    this.dispatchEvent(new Event('input'));
  }

  render() {
    return (
      <div className="select-group">
        <input
          value={this.$value()}
          onInput={this.handleChange}
          onClick={this.handleClick}
          placeholder={this.$placeholder()}
          readOnly
        ></input>
        {/**
         * jsx至少咱们这个不支持Web Component啊 而且这里至少有个注册顺序要管理
         * <ds-icon>
         *  <svg aria-hidden="true">
         *    <use href="#icon-info-circle"></use>
         *  </svg>
         * </ds-icon>
         */}
        <svg aria-hidden="true" className="select-arrow">
          <use href={this.$open() ? '#icon-up' : '#icon-down'}></use>
        </svg>
        {this.$open() ? <SelectDropdown selectInstance={this}></SelectDropdown> : null}
      </div>
    );
  }
}

function SelectDropdown(props) {
  const selectInstance = props.selectInstance;
  const positionStyle = {
    top: selectInstance.offsetTop + selectInstance.offsetHeight + 2 + 'px',
    left: selectInstance.offsetLeft + 'px',
    width: selectInstance.offsetWidth + 'px',
  };

  selectInstance.mask = new Mask().create();
  selectInstance.mask.close(() => selectInstance.$open.set(false));

  return (
    <div className="select-dropdown" style={positionStyle}>
      <slot></slot>
    </div>
  );
}
