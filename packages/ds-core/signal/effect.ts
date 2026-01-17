import {
  clearCurrentSignalsEffects,
  getCurrentEffect,
  getCurrentSignalsEffects,
  setCurrentEffect,
} from './current';

/**
 * 理论上会立刻先同步执行一次，找到其中的signal， 然后在这个signal变更的时候再执行一次
 * effect不会收集func中异步部分的signal
 * 也就是说
 * effect(() => {
 *  const a = signalA();
 *  setTimeout(() => {
 *   const b = signalB(); // 这里的signalB不会被effect收集
 *  }, 1000);
 * }
 */
export function effect(func) {
  // 作为effect时，记录下的上次执行依赖的所有signal上的effects
  const signals = new Set<Set<Function>>();

  const run = () => {
    const prevEffect = getCurrentEffect();

    setCurrentEffect(run);
    clearCurrentSignalsEffects();

    func();

    // 作为effect，清理上次执行依赖但本次执行没有依赖的signal上的effects
    for (const signalEffects of signals) {
      if (!getCurrentSignalsEffects().has(signalEffects)) {
        signalEffects.delete(run);
      }
    }

    setCurrentEffect(prevEffect);
  };

  run();

  return run;
}
