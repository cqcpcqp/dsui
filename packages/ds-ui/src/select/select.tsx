import { Component, Didact } from 'ds-core';
import { Mask } from 'ds-headless';

import style from './select.scss';

@Component({
  select: 'ds-select',
  template: `
    <template id="ds-select">
      <style>
        ${style}
      </style>
    </template>
  `,
})
export default class DsSelect extends HTMLElement {
  static get observedAttributes() {
    return ['size', 'placeholder'];
  }

  private _value;

  get value() {
    return this._value;
  }

  set value(val: string) {
    if (this._value !== val) {
      this._value = val;
      this._render();
    }
  }

  private _isOpen = false;

  get isOpen() {
    return this._isOpen;
  }

  set isOpen(value: boolean) {
    if (this._isOpen !== value) {
      this._isOpen = value;
      this._render();
    }
  }

  shadow;

  mask: Mask;

  connected = false;

  constructor() {
    // TODO(cqcpcqp) 为什么这个倒霉组件第一次render 或者说 外部变更他的value会花那么长时间？
    super();

    this.shadow = this.attachShadow({ mode: 'open' });

    const template: HTMLTemplateElement = document.getElementById(
      'ds-select',
    ) as HTMLTemplateElement;
    const templateContent = template.content;

    this.shadow.appendChild(templateContent.cloneNode(true));

    this.addEventListener('optionSelected', (e: CustomEvent) => {
      this.value = e.detail.value;
      this.isOpen = false;
      this.mask?.destroy();
      e.stopPropagation();
      // 手动触发一个input时间来通知Vue值已改变
      this.dispatchEvent(new Event('input'));
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this._render();
  }

  connectedCallback() {
    this.connected = true;
    this.classList.add('ds-select');

    this._render();
  }

  disconnectedCallback() {}

  private _render() {
    if (this.connected) {
      Didact.render(this.render(), this.shadow);
    }
  }

  render() {
    const handleChange = (e) => {};
    const handleClick = () => (this.isOpen = true);

    return (
      <div className="select-group">
        <input
          value={this.value}
          onInput={handleChange}
          onClick={handleClick}
          placeholder={this.getAttribute('placeholder') || ''}
          readOnly
        ></input>
        {this._isOpen ? <SelectDropdown selectInstance={this}></SelectDropdown> : null}
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
  selectInstance.mask.close(() => (selectInstance.isOpen = false));

  return (
    <div className="select-dropdown" style={positionStyle}>
      <slot></slot>
    </div>
  );
}
