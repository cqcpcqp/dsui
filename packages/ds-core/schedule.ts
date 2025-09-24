import { Fiber } from './model';
import { performUnitOfWork } from './perform';
import { contextQueue } from './context';
import { commitRoot } from './commit';

let nextUnitOfWork: Fiber;

/**
 * current root fiber under workLoop, when contextQueue is empty, it will be null
 */
let currentRoot: Fiber;

export function getCurrentRoot(): Fiber {
  return currentRoot;
}

export function jumpQueue(root: Fiber) {
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
