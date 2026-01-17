import { Fiber } from './model';
import { createDom } from './dom';
import { reconcileChildren } from './reconcile';

export function performUnitOfWork(fiber: Fiber) {
  const isFunctionComponent = fiber.type instanceof Function;

  if (isFunctionComponent) {
    updateFunctionComponent(fiber);
  }

  if (!isFunctionComponent) {
    updateHostComponent(fiber);
  }

  if (fiber.child) return fiber.child;

  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }

    nextFiber = nextFiber.parent;
  }
}

function updateHostComponent(fiber: Fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }

  const elements = fiber.props.children;
  reconcileChildren(fiber, elements);
}

function updateFunctionComponent(fiber: Fiber) {
  if (typeof fiber.type !== 'function') {
    throw new Error('Function component fiber type must be a function');
  }

  const children = [fiber.type(fiber.props)];
  reconcileChildren(fiber, children);
}
