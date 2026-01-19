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

  $count = signal(1);

  $computedCount = computed(() => {
    return this.$count() * 2;
  });

  constructor() {
    super();
  }

  clickHandle() {
    this.$count.set(this.$count() + 1);
  }

  render() {
    return (
      <div onClick={this.clickHandle} className="counter-square">
        <h1>{this.$computedCount()}</h1>
      </div>
    );
  }
}
