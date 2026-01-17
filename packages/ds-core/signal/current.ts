/**
 * 调用input(), signal(), computed()的当前effect
 */
let _currentEffect: Function = null;

export function getCurrentEffect(): Function | null {
  return _currentEffect;
}

export function setCurrentEffect(effect: Function | null): void {
  _currentEffect = effect;
}

/**
 * 统计当前effect执行中实际使用到的所有signal
 * currentSignalsEffects是为了下面这个场景诞生的
 *
 * someCondition = false;
 * signalA = signal('a');
 * signalB = signal('b');
 * computed(() => {
 *  if (someCondition) {
 *   signalA(); // 依赖signalA
 *  } else {
 *   signalB(); // 依赖signalB
 *  }
 * })
 * 
 * 上面这个computed在只会依赖某一个signal，someCondition切换后，需要把之前的依赖干掉
 * 也就是computed(所有具有类似effect功能的'effect')仅仅依赖最近一次执行中出现的signal
 * 
 */
let currentSignalsEffects = new Set<Set<Function>>();

export function getCurrentSignalsEffects() {
  return currentSignalsEffects;
}

export function addCurrentSignalsEffects(effects) {
  currentSignalsEffects.add(effects);
}

export function clearCurrentSignalsEffects() {
  currentSignalsEffects.clear();
}
