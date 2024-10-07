import { Component } from 'ds-core';
import './iconfont.js';

@Component({
  select: 'ds-icon',
  style: `
    <style>
        ds-icon {
            display: inline-block;
        }
        .icon {
            width: 1em;
            height: 1em;
            vertical-align: -0.15em;
            fill: currentColor;
            overflow: hidden;
        }
    </style>
  `,
})
export class DsIcon extends HTMLElement {
  // TODO(cqcpcqp) 似乎可以用template来做symbol元素？
  static get observedAttributes(): string[] {
    return ['icon', 'size', 'color'];
  }

  constructor() {
    super();
  }

  connectedCallback(): void {
    this.innerHTML = `
        <svg class="icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
            <use></use>
        </svg>
      `;

    const use = this.querySelector('use');

    use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `#icon-loading`);
  }

  attributeChangedCallback(name, oldValue, newValue) {}
}
