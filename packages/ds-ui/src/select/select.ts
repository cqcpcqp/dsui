import { Component } from 'ds-core/decorators/component';
import { Mask, Dropdown } from 'ds-headless';

@Component({
  select: 'ds-select',
  template: ` <template id="ds-select">
    <style>
      :host {
        border: 1px solid var(--default-color);
        display: inline-block;
        border-radius: 6px;
        padding: 4px 8px;
        margin: 0;
        font-size: 14px;
        line-height: 24px;
        height: 24px;
        outline: none;
      }
      :host:hover {
        border: 1px solid var(--primary-color);
      }
      :host:focus-visible {
        border: 1px solid var(--primary-color);
        box-shadow: 0 1px 4px 1px rgba(35, 55, 122, 0.08), 0 4px 10px 0 rgba(35, 55, 122, 0.1);
      }
    </style>
  </template>`,
})
export class DsSelect extends HTMLElement {
  static get observedAttributes() {
    return ['size', 'value'];
  }

  shadow;

  mask;

  dropdown;

  controller = new AbortController();

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' });

    const template: HTMLTemplateElement = document.getElementById(
      'ds-select',
    ) as HTMLTemplateElement;
    const templateContent = template.content;

    this.shadow.appendChild(templateContent.cloneNode(true));

    this.addEventListener(
      'click',
      (event) => {
        console.log('select get click');
        this.mask = new Mask().create();
        this.dropdown = new Dropdown(this).create();
        this.querySelectorAll('ds-option').forEach((element) => {
          this.dropdown.dropdownElement.appendChild(element);
        });
        this.mask.close(() => this.dropdown.destroy());
      },
      { signal: this.controller.signal },
    );
  }

  connectedCallback() {}

  attributeChangedCallback(name, oldValue, newValue) {}
}
