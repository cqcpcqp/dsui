import { getCurrentEffect } from './current';
import { INPUT_SIGNAL_SYMBOL, SIGNAL_ALIAS_SYMBOL } from './symbol';

export function input(
  initialValue: any,
  options: {
    alias: string;
  },
) {
  let _value = initialValue;
  let componentRef;

  // 存储依赖这个signal的所有effect
  const effects = new Set<Function>();

  const signal = function () {
    if (!componentRef) {
      componentRef = this;
    }

    const currentEffect = getCurrentEffect();
    if (currentEffect) {
      effects.add(currentEffect);
    }

    return _value;
  };

  // 对于input的signal应该是不允许外部调用set方法的
  signal.set = function (value) {
    if (_value === value) return;

    _value = value;

    // 通知所有effect
    for (const effect of effects) {
      effect();
    }

    // input的signal变更时需要触发render
    if (componentRef && componentRef._render) {
      componentRef._render();
    }
  };

  signal[INPUT_SIGNAL_SYMBOL] = true;

  if (options?.alias) {
    signal[SIGNAL_ALIAS_SYMBOL] = options?.alias;
  }

  return signal;
}
