import { Component, computed, Ds, inject, input, model, signal } from 'ds-core';
import { formInjectToken } from '../form/form';

import style from './input-number.scss';

const INPUT_NUMBER_STEP = 1;

// 长按加速配置
const LONG_PRESS_CONFIG = {
  initialDelay: 300, // 首次触发延迟
  initialInterval: 200, // 初始间隔
  minInterval: 50, // 最快速度
  accelerationRate: 0.9, // 加速系数
  accelerationDelay: 500, // 开始加速的延迟
};

@Component({
  select: 'ds-input-number',
  style,
  template: `
    <!-- input-number组件中用到的svg -->
    <svg aria-hidden="true" style="position: absolute; width: 0px; height: 0px; overflow: hidden;">
      <symbol id="icon-caret-up" viewBox="0 0 1024 1024">
        <path
          d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"
          p-id="8796"
        ></path>
      </symbol>
      <symbol id="icon-caret-down" viewBox="0 0 1024 1024">
        <path
          d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"
          p-id="8646"
        ></path>
      </symbol>
    </svg>
  `,
})
export class DsInputNumber extends HTMLElement {
  $placeholder = input('', { alias: 'placeholder' });

  $min = input(null, { alias: 'min' });

  $max = input(null, { alias: 'max' });

  $value = model<number>(null);

  $size = input(null, { alias: 'size' });

  $formCtx = signal();

  $_size = computed(() => this.$size() || this.$formCtx()?.$size() || 'md');

  // 长按相关的状态
  private longPressTimer: number | null = null;
  private longPressInterval: number | null = null;
  private longPressStartTime: number = 0;
  private currentInterval: number = LONG_PRESS_CONFIG.initialInterval;

  constructor() {
    super();
  }

  disconnectedCallback() {
    this.stopLongPress();
  }

  connectedCallback() {
    this.classList.add('ds-input-number');

    this.$formCtx.set(inject.call(this, formInjectToken));

    const input = this.shadowRoot.querySelector('input');
    input?.addEventListener('keydown', this.handleKeyDown);
  }

  // 处理键盘事件
  handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'ArrowUp') {
      this.upStep(e);
    } else if (e.key === 'ArrowDown') {
      this.downStep(e);
    }
  }

  // 输入时不做任何限制，完全自由输入
  handleChange(e) {
    // 只同步值到 signal，不做任何验证或过滤
    const value = e.target.value;
    const numValue = value === '' ? null : parseFloat(value);
    this.$value.set(isNaN(numValue) ? value : numValue);
  }

  // 失焦时统一处理：过滤非法字符 + 限制范围 + 格式化
  handleBlur(e) {
    const inputValue = e.target.value;

    // 1. 过滤非法字符，提取有效数字
    // 允许：数字、小数点、负号（负号只能在开头）
    let sanitized = inputValue.replace(/[^\d.-]/g, '');

    // 负号只能在开头
    const hasNegative = sanitized.startsWith('-');
    sanitized = sanitized.replace(/-/g, '');
    if (hasNegative) sanitized = '-' + sanitized;

    // 多个小数点只保留第一个
    const parts = sanitized.split('.');
    if (parts.length > 2) {
      sanitized = `${parts[0]}.${parts[1]}`;
    }

    // 2. 转为数字
    let value = sanitized === '' || sanitized === '-' ? null : parseFloat(sanitized);

    // 3. 强制执行 min/max 限制
    if (value !== null && !isNaN(value)) {
      const min = this.$min();
      const max = this.$max();
      if (min !== null) value = Math.max(value, min);
      if (max !== null) value = Math.min(value, max);
    } else {
      value = null;
    }

    // 4. 格式化：去除末尾多余的 0 和小数点
    if (value !== null) {
      let formatted = value.toString();
      if (formatted.includes('.')) {
        formatted = formatted.replace(/\.?0+$/, '');
      }
      value = parseFloat(formatted);
    }

    // 5. 更新 signal 和输入框显示
    this.$value.set(value);
    e.target.value = value === null ? '' : String(value);
  }

  // 增加数值
  upStep(e?: Event) {
    e?.preventDefault();
    e?.stopPropagation();

    const max = this.$max();
    const newValue = (this.$value() || 0) + INPUT_NUMBER_STEP;
    this.$value.set(max !== null ? Math.min(newValue, max) : newValue);
  }

  // 减少数值
  downStep(e?: Event) {
    e?.preventDefault();
    e?.stopPropagation();

    const min = this.$min();
    const newValue = (this.$value() || 0) - INPUT_NUMBER_STEP;
    this.$value.set(min !== null ? Math.max(newValue, min) : newValue);
  }

  private startLongPress(action: () => void) {
    action();

    // 延迟后开始连续触发
    this.longPressTimer = window.setTimeout(() => {
      this.currentInterval = LONG_PRESS_CONFIG.initialInterval;
      this.longPressStartTime = Date.now();

      const runAction = () => {
        action();

        // 动态加速
        const pressDuration = Date.now() - this.longPressStartTime;
        if (
          pressDuration > LONG_PRESS_CONFIG.accelerationDelay &&
          this.currentInterval > LONG_PRESS_CONFIG.minInterval
        ) {
          this.currentInterval = Math.max(
            LONG_PRESS_CONFIG.minInterval,
            this.currentInterval * LONG_PRESS_CONFIG.accelerationRate,
          );

          // 重置 interval 以应用新速度
          if (this.longPressInterval) {
            clearInterval(this.longPressInterval);
            this.longPressInterval = window.setInterval(runAction, this.currentInterval);
          }
        }
      };

      this.longPressInterval = window.setInterval(runAction, this.currentInterval);
    }, LONG_PRESS_CONFIG.initialDelay);
  }

  // 停止长按
  private stopLongPress = () => {
    if (this.longPressTimer) {
      clearTimeout(this.longPressTimer);
      this.longPressTimer = null;
    }
    if (this.longPressInterval) {
      clearInterval(this.longPressInterval);
      this.longPressInterval = null;
    }
    this.currentInterval = LONG_PRESS_CONFIG.initialInterval;
  };

  // 开始长按增加
  startUpLongPress = (e) => {
    e.preventDefault();
    this.startLongPress(() => this.upStep());
  };

  // 开始长按减少
  startDownLongPress = (e) => {
    e.preventDefault();
    this.startLongPress(() => this.downStep());
  };

  render() {
    return (
      <div className={`input-group ${this.$_size() ? 'input-group-' + this.$_size() : ''}`}>
        {/**
         * 为什么要用type="text" 而不直接用type="number"
         * 1. 允许输入非法字符 在 Chrome/Firefox 中，用户可以输入 e, E, +, -, .
         * 2. 样式限制严重 无法完全隐藏 spinner（上下箭头）
         * 3. 格式化困难
         *  - 千分位分隔符（1,000,000）
         *  - 货币符号（$100.00）
         * 4. 值类型混乱
         *  const input = document.querySelector('input[type="number"]');
         *  input.value;      // 返回 "string"
         *  input.valueAsNumber;  // 返回 number，但空值时是 NaN
         */}
        <input
          value={this.$value()}
          onInput={this.handleChange}
          onBlur={this.handleBlur}
          placeholder={this.$placeholder()}
          type="text"
        ></input>
        <div className="spinner-group">
          <span
            onMouseDown={this.startUpLongPress}
            onMouseUp={this.stopLongPress}
            onMouseLeave={this.stopLongPress}
            onTouchStart={this.startUpLongPress}
            onTouchEnd={this.stopLongPress}
          >
            <svg aria-hidden="true">
              <use href="#icon-caret-up"></use>
            </svg>
          </span>
          <span
            onMouseDown={this.startDownLongPress}
            onMouseUp={this.stopLongPress}
            onMouseLeave={this.stopLongPress}
            onTouchStart={this.startDownLongPress}
            onTouchEnd={this.stopLongPress}
          >
            <svg aria-hidden="true">
              <use href="#icon-caret-down"></use>
            </svg>
          </span>
        </div>
      </div>
    );
  }
}
