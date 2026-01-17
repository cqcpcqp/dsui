import { Fiber } from './model';
import { performUnitOfWork } from './perform';
import { contextQueue } from './context';
import { commitRoot } from './commit';

/**
 * work的对象是root下的一个个小fiber，
 */
let nextUnitOfWork: Fiber;

/**
 * current root fiber under workLoop, when contextQueue is empty, it will be null
 * currentRoot是render塞进来的root fiber
 */
export let currentRoot: Fiber;

/**
 * 如果当前正在render的元素有新的render需求，我们就用新的root把旧root覆盖掉
 */
export function coverCurrentWork(root: Fiber) {
  // 只允许元素自己覆盖自己的work，防止不同元素之间互相覆盖
  if (currentRoot.dom !== root.dom) return;

  nextUnitOfWork = root;
  currentRoot = root;
}

function next() {
  if (contextQueue.length) {
    const nextRoot = contextQueue.shift();

    nextUnitOfWork = nextRoot;
    currentRoot = nextRoot;
  }
}

export function workLoop(deadline) {
  let shouldYield = false;

  if (!nextUnitOfWork) {
    next();
  }

  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);

    if (!nextUnitOfWork) {
      if (currentRoot) {
        // Suspect the execution time of commitRoot function is likely to exceed the idle period
        commitRoot(currentRoot);

        currentRoot = null;
      }

      next();
    }

    shouldYield = deadline.timeRemaining() < 1;
  }

  requestIdleCallback(workLoop);
}
