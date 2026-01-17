import { Component, Ds } from 'ds-core';

import style from './button.scss';

@Component({
  select: 'ds-button',
  style,
  template: `<button><slot></slot></button>`,
})
export class DsButton extends HTMLElement {
  static get observedAttributes(): string[] {
    return ['category', 'disabled', 'icon', 'loading', 'outlined', 'size'];
  }

  controller = new AbortController();

  constructor() {
    super();
  }

  connectedCallback() {
    this.addEventListener(
      'click',
      (event) => {
        // 获取 Shadow DOM 内部的 button 元素
        const button = this.shadowRoot.querySelector('button');
        if (!button) return;

        // 涟漪效果
        const btnRippleCircle = document.createElement('span');
        btnRippleCircle.classList.add('ds-btn-ripple-circle');
        btnRippleCircle.classList.add('ds-btn-ripple-circle-color');
        btnRippleCircle.style.top = event.offsetY + 'px';
        btnRippleCircle.style.left = event.offsetX + 'px';

        button.appendChild(btnRippleCircle);

        setTimeout(() => {
          if (button.contains(btnRippleCircle)) {
            button.removeChild(btnRippleCircle);
          }
        }, 500);
      },
      { signal: this.controller.signal },
    );
  }

  adoptedCallback() {
    this.controller.abort();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'loading') {
      const loading = document.createElement('ds-loading');
      this.classList.add('loading');
      loading.setAttribute('size', 'md');
      loading.setAttribute('color', 'disabled');
      loading.setAttribute('style', 'margin-right: 4px');
      this.insertBefore(loading, this.childNodes[0]);
    }
  }
}
