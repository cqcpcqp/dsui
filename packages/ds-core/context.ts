import { DidactElement, Fiber, RenderContext } from './model';

const containerContextMap = new Map<HTMLElement, RenderContext>();

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
