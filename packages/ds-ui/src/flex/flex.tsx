import { Component } from 'ds-core';
import style from './flex.scss';

@Component({
  select: 'ds-flex',
  style,
  template: `<slot name="ds-flex-item"></slot>`,
})
export class DsFlex extends HTMLElement {
  static get observedAttributes() {
    return ['direction', 'align', 'justify', 'gap'];
  }

  constructor() {
    super();
  }

  connectedCallback(): void {
    // TODO(cqcpcqp) 无法支持ngIf / v-if 的使用场景
    for (let i = 0; i < this.children.length; i++) {
      const childElement = this.children[i];
      childElement.setAttribute('slot', 'ds-flex-item');
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.shadowRoot.querySelector('style').textContent = `
      :host {
        display: flex;
        align-items: ${this.getAttribute('align') || 'normal'};
        justify-content: ${this.getAttribute('justify') || 'normal'};
        gap: ${this.getAttribute('gap') || '0'};
        flex-direction: ${this.getAttribute('direction') || 'row'};
      }
    `;
  }
}
