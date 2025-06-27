import { DidactElement, Fiber, RenderContext } from './model';

// TODO(cqcpcqp) 没有任何地方调delete方法 这个map岂不是永远不会有释放？
const containerContextMap = new Map<HTMLElement, RenderContext>();

/**
 * 这里我是有疑问的，不过是一个简单的任务队列，这里还能做什么花活来性能优化？
 * 难道React不是按照render来进行任务划分的？
 */
// TODO(cqcpcqp) should be named as taskQueue
export const contextQueue: Fiber[] = [];

function buildRenderContext(element: DidactElement, container: HTMLElement): RenderContext {
  const renderContext = containerContextMap.get(container);
  const currentRoot = renderContext?.currentRoot;

  return {
    wipRoot: {
      dom: container,
      props: {
        children: [element],
      },
      alternate: currentRoot,
    },
    currentRoot,
    deletions: [],
  };
}

export function initRenderContext(element: DidactElement, container: HTMLElement): RenderContext {
  const context = buildRenderContext(element, container);
  containerContextMap.set(container, context);
  return context;
}

export function getRenderContextByFiber(fiber: Fiber): RenderContext {
  while (fiber.parent) {
    fiber = fiber.parent;
  }

  // 这个as没有问题，因为wipRoot的dom一定是个HTMLElement（container不应当是个Text）
  return containerContextMap.get(fiber.dom as HTMLElement);
}
