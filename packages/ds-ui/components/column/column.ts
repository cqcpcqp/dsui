import { Component } from 'ds-core/decorators/component';

@Component({
  select: 'ds-column',
  style: `
    <style>
        ds-column {
            display: block;
        }
    </style>`,
  template: `
    <template id="ds-column">
      <style>
        :host {
          column-count: 3;
          column-rule: 1px dashed deepskyblue;
          gap: 5%;
        }
      </style>
      <slot name="ds-column-item"></slot>
    </template>
  `,
})
export class DsColumn extends HTMLElement {
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

  disconnectedCallback() {}

  adoptedCallback() {}

  attributeChangedCallback(name, oldValue, newValue) {
    this.updateStyle();
  }

  updateStyle() {
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
