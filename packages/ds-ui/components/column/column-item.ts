import { Component } from 'ds-core/decorators/component';

@Component({
  select: 'ds-column-item',
  template: `
    <template id="ds-column-item">
      <style>
        :host {
          break-inside: avoid;
        }
      </style>
      <slot name="ds-column-item"></slot>
    </template>
  `,
})
export class DsColumnItem extends HTMLElement {
  static get observedAttributes() {
    return [];
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
    console.log(this.childNodes, 'childNode');
    this.updateStyle();
  }

  disconnectedCallback() {}

  adoptedCallback() {}

  attributeChangedCallback(name, oldValue, newValue) {
    this.updateStyle();
  }

  updateStyle() {}
}
