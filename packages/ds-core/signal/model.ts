import { getCurrentEffect } from './current';
import { INPUT_SIGNAL_SYMBOL, SIGNAL_ALIAS_SYMBOL, MODEL_SIGNAL_SYMBOL } from './symbol';

/**
 * ModelSignal 接口 - 双向绑定的 signal
 * 类似 Angular 的 model() API
 * 这个 model有点玩不转
 * 他妈的 读了一下vue代码，对于vue组件 v-model是从事件的当中取值来用的，但是对于webcomponent组件，它是直接读value的
 *
 * 因为外部vue读写这个model，读要读到值，写要通过signal写进值
 * 内部web component读写这个model，读要读到signal，写要写signal
 * 同一个值要有两种不同的表现，这可能需要一个非常魔法。。这个魔法可能会导致千奇百怪的问题出现
 * 要么就要在应用方那边盖一层
 *
 * 这至少意味着我们不能直接使用value这个属性
 * 除了value之外还有什么别的属性我们是不能碰的么？？placeholder？？
 * 原生表单元素都是value，所以我们不要碰这个value
 * 那model呢？？
 *
 */
export interface ModelSignal<T> {
  (): T;
  set(value: T): void;
  update(updater: (value: T) => T): void;
  [MODEL_SIGNAL_SYMBOL]: true;
  [INPUT_SIGNAL_SYMBOL]: true;
}

/**
 * 对于form型组件的默认双向绑定key
 */
export const DEFAULT_BINDING_KEY = 'value';

/**
 * model() - 双向绑定的 signal
 *
 * @param initialValue 初始值
 * @returns ModelSignal
 *
 * @example
 * // 子组件
 * class MyElement extends HTMLElement {
 *   count = model(0)
 *
 *   increment() {
 *     this.count.update(c => c + 1)  // 自动触发 change 事件
 *   }
 * }
 *
 * // 父组件使用 Vue 3
 * // <my-element v-model="parentValue"></my-element>
 */
export function model<T>(
  initialValue?: T,
  options?: {
    alias: string;
  },
): ModelSignal<T> {
  let _value = initialValue;
  let componentRef: any;

  // 存储依赖这个signal的所有effect
  const effects = new Set<Function>();

  const signal = function () {
    if (!componentRef && this) {
      componentRef = this;
    }

    const currentEffect = getCurrentEffect();
    if (currentEffect) {
      effects.add(currentEffect);
    }
    return _value;
  } as ModelSignal<T>;

  signal.set = function (value: T) {
    if (_value === value) return;

    _value = value;

    for (const effect of effects) {
      effect();
    }

    if (componentRef && componentRef._render) {
      componentRef._render();
    }

    // 触发 change 事件用于双向绑定（仅在浏览器环境中）
    if (componentRef && componentRef.dispatchEvent && typeof CustomEvent !== 'undefined') {
      /**
       * 手动触发一个input时间来通知Vue值已改变
       * Q&A:
       * - 为什么input.tsx中就不需要dispatch一个event出去？
       * - 因为input.tsx是直接在原生input里面进行输入的，本身就会触发原生时间，Vue感知的到
       *
       * - 为什么这个事件中不带value？
       * - 因为Vue3可能会直接去读取 someWebComponent.value 而不是使用事件中的value
       */
      componentRef.dispatchEvent(new Event('input'));
    }
  };

  signal[MODEL_SIGNAL_SYMBOL] = true;

  if (options?.alias) {
    signal[SIGNAL_ALIAS_SYMBOL] = options?.alias;
  }

  return signal;
}
