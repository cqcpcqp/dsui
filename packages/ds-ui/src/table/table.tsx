import { Component, Didact, input } from 'ds-core';
import style from './table.scss';

@Component({
  select: 'ds-table',
  style,
})
export default class DsTable extends HTMLElement {
  rows = input([]);

  heads = input([]);

  constructor() {
    super();
  }

  connectedCallback() {
    this._render();
  }

  private _render() {
    Didact.render(this.render(), this.shadowRoot as any);
  }

  render() {
    const rows = this.rows();
    const heads = this.heads();

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
