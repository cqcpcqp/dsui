import { Component, Ds, input, model } from 'ds-core';

import style from './input.scss';

@Component({
  select: 'ds-input',
  style,
})
export class DsInput extends HTMLElement {
  $placeholder = input('', { alias: 'placeholder' });

  // TODO(cqcpcqp) 这个model变了 很显然并不需要重新渲染
  $value = model<string>('');

  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('ds-input');
    this._render();
  }

  private _render() {
    Ds.render(this.render(), this.shadowRoot as any);
  }

  handleChange(e) {
    this.$value.set(e.target.value);
  }

  render() {
    return (
      <div className="input-group">
        {/* prefix */}
        {/* {<svg></svg>} */}
        <input
          value={this.$value()}
          onInput={this.handleChange}
          placeholder={this.$placeholder()}
        ></input>
        {/* suffix */}
        {/* <svg></svg> */}
        {/* error or tip */}
        <div></div>
      </div>
    );
  }
}
