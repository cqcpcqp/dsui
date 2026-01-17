import { Component, Ds, input } from 'ds-core';
import style from './table.scss';

@Component({
  select: 'ds-table',
  style,
})
export class DsTable extends HTMLElement {
  $rows = input([], { alias: 'row' });

  $heads = input([], { alias: 'heads' });

  constructor() {
    super();
  }

  connectedCallback() {
    this._render();
  }

  private _render() {
    Ds.render(this.render(), this.shadowRoot as any);
  }

  render() {
    const rows = this.$rows();
    const heads = this.$heads();

    return (
      <div className="table-container">
        <div className="head-container">
          {heads.map((head) => (
            <div className="head">{head}</div>
          ))}
        </div>
        <div className="row-container">
          {rows.map((row) => (
            <div className="row">
              {heads.map((head) => (
                <div className="cell">{row[head]}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
