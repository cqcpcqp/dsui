import { Component, Didact } from 'ds-core';

import style from './input.scss';

@Component({
  select: 'ds-input',
  template: `
    <template id="ds-input">
      <style>
        ${style}
      </style>
    </template>
  `,
})
export default class DsInput extends HTMLElement {
  static get observedAttributes() {
    return ['size', 'placeholder'];
  }

  private _value = '';

  get value() {
    return this._value;
  }

  set value(val: string) {
    this._value = val;
    /**
     * The current design is to render anyway. In theory, only the content coming in from the outside
     * should be rendered, and the content inside should not be rendered.
     */
    this._render();
  }

  shadow;

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' });

    const template: HTMLTemplateElement = document.getElementById(
      'ds-input',
    ) as HTMLTemplateElement;
    const templateContent = template.content;

    this.shadow.appendChild(templateContent.cloneNode(true));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this._render();
  }

  connectedCallback() {
    this.classList.add('ds-input');
    this._render();
  }

  private _render() {
    Didact.render(this.render(), this.shadow);
  }

  render() {
    const handleChange = (e) => (this.value = e.target.value);
    return (
      <div className="input-group">
        {/* prefix */}
        {/* {<svg></svg>} */}
        <input
          value={this.value}
          onInput={handleChange}
          placeholder={this.getAttribute('placeholder') || ''}
        ></input>
        {/* suffix */}
        {/* <svg></svg> */}
        {/* error or tip */}
        <div></div>
      </div>
    );
  }
}
