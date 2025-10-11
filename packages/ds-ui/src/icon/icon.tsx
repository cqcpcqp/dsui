import { Component, effect, input } from 'ds-core';

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
  style,
  template: `<slot></slot>`,
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
  size = input('md');

  /** Icon color, support 'danger', 'primary', 'warning', 'success', 'default' */
  color = input('default');

  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('ds-icon');

    effect(() => {
      // 用这种class的方式没办法做到自定义颜色了 自己在外面设吧
      if (ICON_COLORS.includes(this.color())) {
        ICON_COLORS.forEach((c) => {
          this.classList.remove(`ds-icon-${c}`);
        });
        this.classList.add(`ds-icon-${this.color()}`);
      }
    });

    effect(() => {
      // 用这种class的方式没办法做到自定义大小 自己在外面设吧
      if (ICON_SIZES.includes(this.size())) {
        ICON_SIZES.forEach((s) => {
          this.classList.remove(`ds-size-${s}`);
        });
        this.classList.add(`ds-size-${this.size()}`);
      }
    });
  }
}
