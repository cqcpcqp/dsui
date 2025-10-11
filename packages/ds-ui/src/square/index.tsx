import { Component } from 'ds-core';
import { Didact } from 'ds-core';

import style from './index.scss';

@Component({
  select: 'ds-square',
  style,
})
export default class Square extends HTMLElement {
  static get observedAttributes() {
    return ['color', 'size'];
  }

  constructor() {
    super();
  }

  connectedCallback() {
    Didact.render(this.render(), this.shadowRoot as any);
  }

  disconnectedCallback() {}

  adoptedCallback() {}

  attributeChangedCallback(name, oldValue, newValue) {}

  render() {
    return <CounterSquare />;
  }
}

function CounterSquare() {
  const [state, setState] = Didact.useState(1);

  return (
    <div onClick={() => setState((c: number) => c + 1)} className="counter-square">
      <h1>{state}</h1>
    </div>
  );
}
