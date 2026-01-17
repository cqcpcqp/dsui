import {
  addCurrentSignalsEffects,
  clearCurrentSignalsEffects,
  getCurrentEffect,
  getCurrentSignalsEffects,
  setCurrentEffect,
} from './current';

/**
 * 和effect一样，会先执行一次，找到其中的signal，然后在这些signal变更时再执行
 * 不过computed会有返回值,作为一个新的signal返回
 * 这玩意ai写的，我不知道走不走通还
 */
export function computed(func) {
  let _value;

  // 作为signal时，依赖这个signal的所有effect
  const effects = new Set<Function>();

  // 作为effect时，记录下的上次执行依赖的所有signal上的effects
  const signals = new Set<Set<Function>>();

  const computeSignal = function () {
    const currentEffect = getCurrentEffect();
    if (currentEffect) {
      effects.add(currentEffect);
      addCurrentSignalsEffects(effects);
    }
    return _value;
  };

  // 占据一段时间currentEffect, 执行完成后再还原
  const run = () => {
    const currentEffect = getCurrentEffect();
    const prevEffect = currentEffect;

    setCurrentEffect(run);
    clearCurrentSignalsEffects();

    _value = func();

    // 作为effect，清理上次执行依赖但本次执行没有依赖的signal上的effects
    for (const signalEffects of signals) {
      if (!getCurrentSignalsEffects().has(signalEffects)) {
        signalEffects.delete(run);
      }
    }

    setCurrentEffect(prevEffect);

    // 当依赖的signal变更时，重新计算值，并通知依赖它的effect
    for (const effect of effects) {
      effect();
    }
  };

  run();

  return computeSignal;
}
