import { Component } from 'ds-core/decorators/component';

@Component({
  select: 'ds-column-item',
  template: `
    <template id="ds-column-item">
      <style>
        :host {
          break-inside: avoid;
          display: block;
        }
      </style>
    </template>
  `,
})
export class DsColumnItem extends HTMLElement {
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
    this.childNodes.forEach((_childNode) => {
      this.shadow.appendChild(_childNode);
    });
  }

  disconnectedCallback() {}

  adoptedCallback() {}

  attributeChangedCallback(name, oldValue, newValue) {}
}
