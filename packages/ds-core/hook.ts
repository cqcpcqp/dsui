import { Fiber } from './model';
import { reconcileChildren } from './reconcile';
import { getRenderContextByFiber, contextQueue } from './context';

// 因为在updateFunctionComponent中会调用useState，所以需要在这里定义
// 这个变量，来保存当前正在处理的fiber
let wipFiber: Fiber;

// 一个useState对应一个hook 一个fiber对应多个useState，hookeIndex
// 也是跟上面的wipFiber一样，为了跨updatFunctionComponent与useState而存在的共用变量
// 这里无论如何都暗含了一个逻辑，就是在调用updateFunctionComponent时，会去调useState
let hookIndex: number;

// function类型的是没有自己的dom的，它是父的fiber下面添加上function构造出来的children
export function updateFunctionComponent(fiber: Fiber) {
  if (typeof fiber.type !== 'function') {
    throw new Error('Function component fiber type must be a function');
  }

  wipFiber = fiber;
  hookIndex = 0;
  wipFiber.hooks = [];
  const children = [fiber.type(fiber.props)];
  reconcileChildren(fiber, children);
}

/**
 * 1. A: upadateFunctionComponent wipFiber Change to 1
 * 2. A: useState fiber 1
 * 3. B: upadateFunctionComponent wipFiber Change to 2
 * 4. B: useState fiber 2
 * 5. A: setState fiber 1
 * 5. B: setState fiber 2
 */
export function useState(initial) {
  const oldHook =
    wipFiber.alternate && wipFiber.alternate.hooks && wipFiber.alternate.hooks[hookIndex];
  const hook = {
    // 状态持久化：通过oldHook.state保持状态在重新渲染时不丢失
    state: oldHook ? oldHook.state : initial,
    queue: [],
  };

  const useStateFiber = wipFiber;

  // 处理未执行的更新：通过oldHook.queue获取上一次渲染期间积累但未处理的state更新
  const actions = oldHook ? oldHook.queue : [];
  actions.forEach((action: Function) => {
    hook.state = action(hook.state);
  });

  const setState = (action) => {
    hook.queue.push(action);
    const { currentRoot, deletions } = getRenderContextByFiber(useStateFiber);
    const renderContext = getRenderContextByFiber(useStateFiber);
    renderContext.wipRoot = {
      dom: currentRoot.dom,
      props: currentRoot.props,
      alternate: currentRoot,
    };
    deletions.length = 0;
    contextQueue.push(renderContext.wipRoot);
  };

  wipFiber.hooks.push(hook);
  hookIndex++;

  return [hook.state, setState];
}