import { DsElement, Fiber, RenderContext } from './model';

// TODO(cqcpcqp) 没有任何地方调delete方法 这个map岂不是永远不会有释放？
const containerContextMap = new Map<HTMLElement, RenderContext>();

// TODO(cqcpcqp) should be named as taskQueue
export const contextQueue: Fiber[] = [];

/**
 * 构建渲染上下文
 * 因为每次render调用都会创建一个新的wipRoot
 * 所以用renderContext来在每次渲染过程中找到对应的root
 * 以实现多root的渲染功能
 * 
 * 每个组件都有自己唯一的一个root去渲染？这样的话{ children }这样的使用会有什么表现呢？？
 * 这里的container实际上可以精确为ShadowRoot，我们应当限制组件只能挂在shadowRoot上渲染？
 */
function buildRenderContext(element: DsElement, container: HTMLElement): RenderContext {
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

export function initRenderContext(element: DsElement, container: HTMLElement): RenderContext {
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
