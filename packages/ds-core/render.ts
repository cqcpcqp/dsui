import { DsElement, Fiber } from './model';
import { initRenderContext, contextQueue } from './context';
import { workLoop, currentRoot, coverCurrentWork } from './schedule';

let started = false;

export function render(element: DsElement, container: HTMLElement) {
  const { wipRoot } = initRenderContext(element, container);

  if (currentRoot?.dom === wipRoot.dom) {
    coverCurrentWork(wipRoot);
  } else {
    const index = contextQueue.findIndex((fiber: Fiber) => fiber?.dom === wipRoot.dom);

    if (index !== -1) {
      contextQueue[index] = wipRoot;
    } else {
      contextQueue.push(wipRoot);
    }
  }

  if (!started) {
    started = true;
    requestIdleCallback(workLoop);
  }
}
