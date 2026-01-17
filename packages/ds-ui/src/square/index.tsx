import { Component, computed, effect, signal } from 'ds-core';
import { Ds } from 'ds-core';

import style from './index.scss';

@Component({
  select: 'ds-square',
  style,
})
export class Square extends HTMLElement {
  static get observedAttributes() {
    return ['color', 'size'];
  }

  count = signal(1);

  computedCount = computed(() => {
    return this.count() * 2;
    this._render();
  });

  constructor() {
    super();
  }

  connectedCallback() {
    effect(() => {
      this._render();
    });
  }

  _render() {
    Ds.render(this.render(), this.shadowRoot as any);
  }

  render() {
    const count = this.computedCount();
    return (
      <div onClick={() => this.count.set(this.count() + 1)} className="counter-square">
        <h1>{count}</h1>
      </div>
    );
  }
}
