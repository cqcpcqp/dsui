import { DidactElement } from './model';
import { initRenderContext, contextQueue } from './context';
import { workLoop } from './schedule';

let started = false;

export function render(element: DidactElement, container: HTMLElement) {
  const { wipRoot } = initRenderContext(element, container);

  contextQueue.push(wipRoot);

  if (!started) {
    started = true;
    requestIdleCallback(workLoop);
  }
}
