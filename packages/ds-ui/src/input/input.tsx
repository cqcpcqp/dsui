import { Component, Didact, input } from 'ds-core';

import style from './input.scss';

@Component({
  select: 'ds-input',
  style,
})
export default class DsInput extends HTMLElement {
  placeholder = input('');

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

  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('ds-input');
    this._render();
  }

  private _render() {
    Didact.render(this.render(), this.shadowRoot as any);
  }

  render() {
    const handleChange = (e) => (this.value = e.target.value);
    return (
      <div className="input-group">
        {/* prefix */}
        {/* {<svg></svg>} */}
        <input value={this.value} onInput={handleChange} placeholder={this.placeholder()}></input>
        {/* suffix */}
        {/* <svg></svg> */}
        {/* error or tip */}
        <div></div>
      </div>
    );
  }
}
