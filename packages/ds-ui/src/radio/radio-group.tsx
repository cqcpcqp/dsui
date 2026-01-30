import {
  Component,
  computed,
  createInjectToken,
  effect,
  inject,
  input,
  model,
  provide,
  signal,
} from 'ds-core';
import { formInjectToken } from '../form/form';

import style from './radio-group.scss';

export const radioGroupInjectToken = createInjectToken('radio-group');

@Component({
  select: 'ds-radio-group',
  style,
  template: ` <div class="radio-slider-track"></div>
    <slot></slot>`,
})
export class DsRadioGroup extends HTMLElement {
  $value = model();

  $size = input(null, { alias: 'size' });

  $name = input(null, { alias: 'name' });

  $type = input('text', { alias: 'type' });

  $formCtx = signal();

  $sliderTrackEle = signal();

  $_size = computed(() => this.$size() || this.$formCtx()?.$size() || 'md');

  private items: any[] = [];

  private resizeObserver: ResizeObserver;

  constructor() {
    super();

    provide.call(this, radioGroupInjectToken, {
      $value: this.$value,
      $size: this.$_size,
      $name: this.$name,
      $type: this.$type,
      registerItem: this.registerItem.bind(this),
      unregisterItem: this.unregisterItem.bind(this),
    });

    // 这两个哥们影响初始化
    effect(() => {
      if (this.$type() === 'slider' && this.$sliderTrackEle()) {
        this.setupSlider();
        requestAnimationFrame(() => this.updateSliderPosition());
      }
    });

    // 加上value就耀去重新update
    effect(() => {
      if (this.$type() === 'slider' && this.$sliderTrackEle() && this.$value() !== undefined) {
        requestAnimationFrame(() => this.updateSliderPosition());
      }
    });
  }

  // 注册 radio item
  registerItem(item) {
    if (!this.items.includes(item)) {
      this.items.push(item);

      if (this.$type() === 'slider') {
        this.resizeObserver.observe(item);
        this.updateSliderPosition();
      }
    }
  }

  // 注销 radio item
  unregisterItem(item) {
    const index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1);

      if (this.$type() === 'slider') {
        this.resizeObserver.unobserve(item);
        this.updateSliderPosition();
      }
    }
  }

  connectedCallback() {
    this.classList.add('ds-radio-group');

    const type = this.$type();
    if (type && type !== 'text') {
      this.classList.add(`ds-radio-group-${type}`);
    }

    this.$formCtx.set(inject.call(this, formInjectToken));
    this.$sliderTrackEle.set(this.shadowRoot?.querySelector('.radio-slider-track'));
  }

  disconnectedCallback() {
    this.resizeObserver?.disconnect();
    this.items = [];
  }

  private setupSlider() {
    this.resizeObserver = new ResizeObserver(() => this.updateSliderPosition());
    this.resizeObserver.observe(this);
  }

  // 本来应该能用signal写的，但是不用试我都知道requestAnimationFrame和ResizeObserver根本适配不了
  private updateSliderPosition() {
    const value = this.$value();

    const selectedItem = this.items.find((item) => item.$value() === value);

    if (selectedItem) {
      const itemRect = selectedItem.getBoundingClientRect();
      const hostRect = this.getBoundingClientRect();

      // 计算相对于 host 的位置
      const left = itemRect.left - hostRect.left;
      const width = itemRect.width;

      this.$sliderTrackEle().style.transform = `translateX(${left}px)`;
      this.$sliderTrackEle().style.width = `${width}px`;
      this.$sliderTrackEle().style.opacity = '1';
    } else if (value === undefined || value === null) {
      this.$sliderTrackEle().style.opacity = '0';
    }
  }
}
