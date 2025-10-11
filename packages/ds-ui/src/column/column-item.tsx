import { Component } from 'ds-core';
import style from './column-item.scss';

@Component({
  select: 'ds-column-item',
  style,
  template: `<slot></slot>`,
})
export default class DsColumnItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.setAttribute('slot', 'ds-column-item');
  }
}
