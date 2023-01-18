import { Component } from 'ds-core/decorators/component';

@Component({
  select: 'ds-square',
  template: ` <template id="ds-square">
    <style></style>
  </template>`,
})
export class Square extends HTMLElement {
  static get observedAttributes() {
    return ['color', 'size'];
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
      width: ${this.getAttribute('size')}px;
      height: ${this.getAttribute('size')}px;
      background-color: ${this.getAttribute('color')};
      display: block;
    }
    `;
  }
}
