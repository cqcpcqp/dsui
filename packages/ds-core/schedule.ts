import { Fiber } from './model';
import { performUnitOfWork } from './perform';
import { contextQueue } from './context';
import { commitRoot } from './commit';

let nextUnitOfWork: Fiber;
let currentRoot: Fiber;

export function workLoop(deadline) {
  let shouldYield = false;

  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }

  if (!nextUnitOfWork) {
    if (currentRoot) {
      // 怀疑commitRoot函数执行时间很容易超出idle period
      commitRoot(currentRoot);

      currentRoot = null;
    }

    if (contextQueue.length) {
      const nextRoot = contextQueue.shift();

      nextUnitOfWork = nextRoot;
      currentRoot = nextRoot;
    }
  }

  requestIdleCallback(workLoop);
}
