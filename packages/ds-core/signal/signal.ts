import { getCurrentEffect } from './current';
import { SIGNAL_SYMBOL } from './symbol';

/**
 * signal只有直接在jsx中被调用了才会触发render
 * 那是不是说在render的时候我们自己写一个effect就可以了
 */
export function signal(v?) {
  let _value = v;
  const effects = new Set<Function>();

  const signal = function () {
    const currentEffect = getCurrentEffect();
    if (currentEffect) {
      effects.add(currentEffect);
    }
    return _value;
  };

  signal.set = function (value) {
    if (_value === value) return;

    _value = value;

    // 通知所有effect
    for (const effect of effects) {
      effect();
    }
  };

  signal[SIGNAL_SYMBOL] = true;

  return signal;
}
