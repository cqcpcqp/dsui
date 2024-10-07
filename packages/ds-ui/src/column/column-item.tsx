import { Component } from 'ds-core';
import style from './column-item.scss';

@Component({
  select: 'ds-column-item',
  template: `
    <template id="ds-column-item">
      <style>
        ${style}
      </style>
      <slot></slot>
    </template>
  `,
})
export default class DsColumnItem extends HTMLElement {
  static get observedAttributes() {
    return ['slot'];
  }

  shadow;

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' });

    const template: HTMLTemplateElement = document.getElementById(
      'ds-column-item',
    ) as HTMLTemplateElement;
    const templateContent = template.content;

    this.shadow.appendChild(templateContent.cloneNode(true));
  }

  connectedCallback() {
    this.setAttribute('slot', 'ds-column-item');
  }
}
