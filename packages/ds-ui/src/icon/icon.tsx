import { Component, Didact } from 'ds-core';

import style from './icon.scss';
// from https://www.iconfont.cn/collections/detail?spm=a313x.collections_index.i1.d9df05512.406d3a81hEt0X8&cid=9402
import './icon-font.js';
import _ from 'lodash';

const ICON_COLORS = [
  'danger',
  'primary',
  'warning',
  'success',
  'info',
  'default',
  'secondary',
  'mute',
  'disabled',
  'reverse',
];

const ICON_SIZES = ['sm', 'md', 'lg'];

@Component({
  select: 'ds-icon',
  template: `
    <template id="ds-icon">
      <style>
        ${style}
      </style>
      <slot></slot>
    </template>
  `,
})
export default class DsIcon extends HTMLElement {
  /**
   * Vue的两种绑定方式
   * 1. 属性绑定 Attribute: color="primary"
   * 2. 属性绑定 Property: :color="color"
   * Web Components的机制
   * observedAttributes和attributeChangedCallback只监听HTML属性的变化
   */
  static get observedAttributes() {
    return [];
  }

  /** Icon size, support 'sm', 'md', 'lg' or arbitrary size. Default size is 'md', 16px. */
  private _size = 'md';

  get size() {
    return this._size;
  }

  set size(value: string) {
    if (this._size !== value) {
      this._size = value;
      this.setSize();
    }
  }

  /** Icon color, support 'danger', 'primary', 'warning', 'success', 'default' */
  private _color = 'default';

  get color() {
    return this._color;
  }

  set color(value: string) {
    if (this._color !== value) {
      this._color = value;
      this.setColor();
    }
  }

  shadow;

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' });

    const template: HTMLTemplateElement = document.getElementById('ds-icon') as HTMLTemplateElement;
    const templateContent = template.content;

    this.shadow.appendChild(templateContent.cloneNode(true));
  }

  setColor() {
    // 用这种class的方式没办法做到自定义颜色了 自己在外面设吧
    if (ICON_COLORS.includes(this.color)) {
      ICON_COLORS.forEach((c) => {
        this.classList.remove(`ds-icon-${c}`);
      });
      this.classList.add(`ds-icon-${this.color}`);
    }
  }

  setSize() {
    // 用这种class的方式没办法做到自定义大小 自己在外面设吧
    if (ICON_SIZES.includes(this.size)) {
      ICON_SIZES.forEach((s) => {
        this.classList.remove(`ds-size-${s}`);
      });
      this.classList.add(`ds-size-${this.size}`);
    }
  }

  connectedCallback() {
    this.setColor();
    this.setSize();
    this.classList.add('ds-icon');
  }
}
