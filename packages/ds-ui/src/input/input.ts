import { Component } from 'ds-core';

@Component({
  select: 'ds-input',
  extends: 'input',
  style: `
    <style>
      input[is="ds-input"] {
        height: 24px;
        border: 1px solid var(--default-color);
        display: inline-block;
        border-radius: 6px;
        padding: 4px 8px;
        margin: 0;
        font-size: 14px;
        line-height: 24px;
        outline: none;
        width: 100%;
      }
      input[is="ds-input"]:hover {
        border: 1px solid var(--primary-color);
      }
      input[is="ds-input"]:focus-visible {
        border: 1px solid var(--primary-color);
        box-shadow: 0 1px 4px 1px rgba(35, 55, 122, .08),0 4px 10px 0 rgba(35, 55, 122, .1)
      }
    </style>
  `,
})
export class DsInput extends HTMLInputElement {
  static get observedAttributes() {
    return ['size'];
  }

  shadow;

  constructor() {
    super();
  }

  connectedCallback() {
    this.setAttribute('type', 'text');
  }

  attributeChangedCallback(name, oldValue, newValue) {}
}
