/**
 * 我想实现的效果是
 * a = input('123');
 * a() => '123'
 * a = '456';
 * a() => '456'
 * 但是js这个语言本身是不允许重载赋值操作的
 * 所以就不可能，除非挂在window上，但是太丑了了
 *
 * 我感觉可能只能在@Component里做文章，想办法阻止vue给自定义元素设置属性
 * 然后在组件里自己去处理
 * 简单来讲就是把所有的属性都记下来？
 */

/**
 * 有的属性变更时需要去触发 render 比如value placeholder
 * 有的组件不需要 比如 size
 * 这样看 observerAttributes 没有任何存在的必要
 *
 * btw
 * v-bind:
 * vue3对自定义元素有特殊处理
 * 如果自定义元素有对应的property，Vue会优先设置property
 * 如果没有对应的property，才会会退到设置attribute
 */

export function input(initialValue) {
  let _value = initialValue;
  let componentRef;

  // 存储依赖这个signal的所有effect
  // effect与signal是多对多的关系
  const effects = new Set<Function>();

  const signal = function () {
    if (!componentRef) {
      // TODO(cqcpcqp) 到底为什么这个this是指向的componentRef
      componentRef = this;
    }

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

  signal.__isInputSignal = true;

  return signal;
}

let currentEffect = null;

/**
 * 理论上会先执行一次，找到其中的signal， 然后在这个signal变更的时候再执行一次
 * effect不会收集func中异步部分的signal
 */
export function effect(func) {
  const run = () => {
    const prevEffect = currentEffect;
    currentEffect = run;
    try {
      func();
    } finally {
      currentEffect = prevEffect;
    }
  };

  run();
  return run;
}
