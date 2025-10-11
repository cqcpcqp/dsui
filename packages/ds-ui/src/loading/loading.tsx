import { Component } from 'ds-core';
import style from './loading.scss';

@Component({
  select: 'ds-loading',
  template: `
    <template id="ds-loading">
      <style>
        ${style}
      </style>
      <svg viewbox="0 0 50 50">
        <circle cx="50%" cy="50%" r="20" fill="none" />
      </svg>
    </template>
  `,
})
export default class DsLoading extends HTMLElement {
  static get observedAttributes(): string[] {
    return ['color', 'size'];
  }

  shadow;

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' });

    const template: HTMLTemplateElement = document.getElementById(
      'ds-loading',
    ) as HTMLTemplateElement;
    const templateContent = template.content;

    this.shadow.appendChild(templateContent.cloneNode(true));
  }

  connectedCallback() {
    // set color & size
    const svg = this.shadow.querySelector('svg');
    svg.classList.add(this.getAttribute('color') || 'primary');

    const size = this.getAttribute('size');
    if (size === 'sm') {
      this.style.width = '12px';
      this.style.height = '12px';
    } else if (size === 'md') {
      this.style.width = '18px';
      this.style.height = '18px';
    } else if (size === 'lg') {
      this.style.width = '26px';
      this.style.height = '26px';
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // this.updateStyle();
  }
}
