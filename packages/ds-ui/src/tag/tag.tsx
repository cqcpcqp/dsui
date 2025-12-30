import { Component } from 'ds-core';

import style from './tag.scss';

@Component({
  select: 'ds-tag',
  style,
  template: `<slot></slot>`,
})
export default class DsTag extends HTMLElement {
  static get observedAttributes(): string[] {
    return ['type', 'size'];
  }

  constructor() {
    super();
  }
}
