import { Component } from 'ds-core';

@Component({
  select: 'ds-option',
  style: `
    <style>
        ds-option {
            cursor: pointer;
        }
    </style>
  `,
})
export class DsOption extends HTMLElement {
  static get observedAttributes() {
    return ['value'];
  }

  constructor() {
    super();
  }

  connectedCallback() {}

  attributeChangedCallback(name, oldValue, newValue) {}
}
