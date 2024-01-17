import { Component } from 'ds-core/decorators/component';

@Component({
  select: 'ds-flex',
  template: `
    <template id="ds-flex">
      <style>
        :host {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
        }
      </style>
      <slot name="ds-flex-item"></slot>
    </template>
  `,
})
export class DsFlex extends HTMLElement {
  static get observedAttributes() {
    return ['direction'];
  }

  shadow;

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' });

    const template: HTMLTemplateElement = document.getElementById('ds-flex') as HTMLTemplateElement;
    const templateContent = template.content;

    this.shadow.appendChild(templateContent.cloneNode(true));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'direction') {
      const shadow = this.shadow;

      shadow.querySelector('style').textContent = `
      :host {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;
        flex-direction: ${this.getAttribute('direction') || 'row'};
      }
    `;
    }
  }
}
