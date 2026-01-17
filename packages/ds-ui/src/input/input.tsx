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

  // handleChange(e) {
  //   this.value = e.target.value;
  // }

  render() {
    // TODO(cqcpcqp) 这个handleChange还不能弄成上面那个类的属性 为啥？？
    const handleChange = (e) => this.$value.set(e.target.value);

    return (
      <div className="input-group">
        {/* prefix */}
        {/* {<svg></svg>} */}
        <input
          value={this.$value()}
          onInput={handleChange}
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
