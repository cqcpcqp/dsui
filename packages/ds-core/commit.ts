import { Fiber } from './model';
import { updateDom } from './dom';
import { getRenderContextByFiber } from './context';

// commit fiber to dom
export function commitWork(fiber: Fiber) {
  if (!fiber) return;

  let domParentFiber = fiber.parent;
  while (!domParentFiber.dom) {
    domParentFiber = domParentFiber.parent;
  }
  const parentDom = domParentFiber.dom;

  if (fiber.effectTag === 'PLACEMENT' && fiber.dom !== null) {
    parentDom.appendChild(fiber.dom);
  } else if (fiber.effectTag === 'UPDATE') {
    updateDom(fiber.dom, fiber.alternate.props, fiber.props);
  } else if (fiber.effectTag === 'DELETION') {
    commitDeletion(fiber.dom, parentDom);
  }

  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

function commitDeletion(fiber, domParent) {
  if (fiber.dom) {
    domParent.removeChild(fiber.dom);
  } else {
    commitDeletion(fiber.child, domParent);
  }
}

export function commitRoot(scheduleCurrentRoot: Fiber) {
  const renderContext = getRenderContextByFiber(scheduleCurrentRoot);
  renderContext.deletions.forEach(commitWork);
  commitWork(renderContext.wipRoot.child);
  renderContext.currentRoot = renderContext.wipRoot;
  renderContext.wipRoot = null;
}
