import { Component } from 'ds-core';

import style from './button.scss';

@Component({
  select: 'ds-button',
  extends: 'button',
  style: `
    <style>${style}</style>
  `,
})
export default class DsButton extends HTMLButtonElement {
  static get observedAttributes(): string[] {
    return ['category', 'disabled', 'icon', 'loading', 'outlined', 'size'];
  }

  controller = new AbortController();

  constructor() {
    super();
    this.addEventListener(
      'click',
      (event) => {
        const btnRippleCircle = document.createElement('span');
        btnRippleCircle.classList.add('ds-btn-ripple-circle');
        btnRippleCircle.classList.add('ds-btn-ripple-circle-color');
        btnRippleCircle.style.top = event.offsetY + 'px';
        btnRippleCircle.style.left = event.offsetX + 'px';
        this.appendChild(btnRippleCircle);
        setTimeout(() => {
          this.removeChild(btnRippleCircle);
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
    this.updateStyle();
  }

  updateStyle(): void {}
}
