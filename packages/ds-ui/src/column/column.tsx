import { Component } from 'ds-core';
import style from './column.scss';

@Component({
  select: 'ds-column',
  template: `
    <template id="ds-column">
      <style>
        ${style}
      </style>
      <slot name="ds-column-item"></slot>
    </template>
  `,
})
export default class DsColumn extends HTMLElement {
  static get observedAttributes() {
    return ['count ', 'rule', 'gap'];
  }

  shadow;

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' });

    const template: HTMLTemplateElement = document.getElementById(
      'ds-column',
    ) as HTMLTemplateElement;
    const templateContent = template.content;

    this.shadow.appendChild(templateContent.cloneNode(true));
  }

  connectedCallback() {
    this.updateStyle();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.updateStyle();
  }

  updateStyle() {
    return;
    const shadow = this.shadow;
    shadow.querySelector('style').textContent = `
    :host {
      column-count: ${this.getAttribute('count')};
      column-rule: 1px dashed deepskyblue;
      gap: ${this.getAttribute('gap')};
    }
    `;
  }
}
