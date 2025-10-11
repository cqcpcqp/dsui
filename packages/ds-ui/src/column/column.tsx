import { Component } from 'ds-core';
import style from './column.scss';

@Component({
  select: 'ds-column',
  style,
  template: `<slot name="ds-column-item"></slot>`,
})
export default class DsColumn extends HTMLElement {
  static get observedAttributes() {
    return ['count ', 'rule', 'gap'];
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.updateStyle();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.updateStyle();
  }

  updateStyle() {
    return;
    const shadow = this.shadowRoot;
    shadow.querySelector('style').textContent = `
    :host {
      column-count: ${this.getAttribute('count')};
      column-rule: 1px dashed deepskyblue;
      gap: ${this.getAttribute('gap')};
    }
    `;
  }
}
