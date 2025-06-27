import { DidactElement, Fiber } from './model';
import { initRenderContext, contextQueue } from './context';
import { workLoop, getCurrentRoot, jumpQueue } from './schedule';

let started = false;

export function render(element: DidactElement, container: HTMLElement) {
  const { wipRoot } = initRenderContext(element, container);

  /**
   * 在[...contextQueue, currentRoot]中找到相同的对同一个container的render任务
   * 将其替换为现在的render任务
   */
  const currentRoot = getCurrentRoot();
  const hasPreRender = [...contextQueue, currentRoot].some((fiber: Fiber) => {
    return fiber?.dom === wipRoot.dom;
  });

  if (hasPreRender) {
    if (currentRoot?.dom === wipRoot.dom) {
      jumpQueue(wipRoot);
    } else {
      const index = contextQueue.findIndex((fiber: Fiber) => {
        return fiber?.dom === wipRoot.dom;
      });
      if (index !== -1) {
        contextQueue[index] = wipRoot;
      }
    }
  } else {
    contextQueue.push(wipRoot);
  }

  if (!started) {
    started = true;
    requestIdleCallback(workLoop);
  }
}
