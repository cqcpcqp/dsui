import { Component } from 'ds-core';

@Component({
  select: 'ds-flex',
  template: `
    <template id="ds-flex">
      <style>
        :host {
          display: flex;
        }
      </style>
      <slot name="ds-flex-item"></slot>
    </template>
  `,
})
export class DsFlex extends HTMLElement {
  static get observedAttributes() {
    return ['direction', 'align', 'justify', 'gap'];
  }

  shadow;

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' });

    const template: HTMLTemplateElement = document.getElementById('ds-flex') as HTMLTemplateElement;
    const templateContent = template.content;

    this.shadow.appendChild(templateContent.cloneNode(true));
  }

  connectedCallback(): void {
    // TODO(cqcpcqp) 无法支持ngIf / v-if 的使用场景
    for (let i = 0; i < this.children.length; i++) {
      const childElement = this.children[i];
      childElement.setAttribute('slot', 'ds-flex-item');
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const shadow = this.shadow;

    shadow.querySelector('style').textContent = `
      :host {
        display: flex;
        align-items: ${this.getAttribute('align') || 'normal'};
        justify-content: ${this.getAttribute('justify') || 'normal'};
        gap: ${this.getAttribute('gap') || '0'};
        flex-direction: ${this.getAttribute('direction') || 'row'};
      }
    `;
  }
}
