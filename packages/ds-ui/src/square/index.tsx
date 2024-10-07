import { Component } from 'ds-core';
import { Didact } from 'ds-core';

import style from './index.scss';

@Component({
  select: 'ds-square',
  template: `
    <template id="ds-square">
      <style>
        ${style}
      </style>
    </template>
  `,
})
export default class Square extends HTMLElement {
  static get observedAttributes() {
    return ['color', 'size'];
  }

  shadow;

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' });

    const template: HTMLTemplateElement = document.getElementById(
      'ds-square',
    ) as HTMLTemplateElement;
    const templateContent = template.content;

    this.shadow.appendChild(templateContent.cloneNode(true));
  }

  connectedCallback() {
    Didact.render(this.render(), this.shadow);
  }

  disconnectedCallback() {}

  adoptedCallback() {}

  attributeChangedCallback() {}

  render() {
    // TODO(cqcpcqp) rootFiber不支持hook这应该是ds-core的锅
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
