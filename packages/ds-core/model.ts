export type HostComponentType = keyof HTMLElementTagNameMap | 'TEXT_ELEMENT';
export type FiberType = HostComponentType | Function;

export interface DidactElement {
  type: FiberType;
  props: {
    [key: string]: any;
    children: DidactElement[];
  };
}

export interface Hook {
  state: any;
  queue: Function[];
}

export interface Fiber {
  /**
   * Fiber对应的实体dom
   */
  dom: HTMLElement | Text;

  /**
   * key: so called element attributes, which means only legal value accepted
   */
  props: {
    [key: string]: any;
    children: DidactElement[];
  };

  /**
   * Points to the last rendered copy of the current fiber,
   * similar to the current tree in react
   */
  alternate: Fiber;

  parent?: Fiber;

  type?: FiberType;

  /**
   * 指向由当前fiber.children中第一个DidactElement生成的Fiber
   * 由于child的sibling指向兄弟fiber，所以这里代表的是reconcile后由DidactElement生成的
   * 待执行的fiber，也就是有effectTag的fiber
   */
  child?: Fiber;

  /**
   * 指向兄弟fiber
   * 例如：由当前fiber.child的的sibling应该指向由当前fiber.children中第二个
   * DidactElement生成的Fiber
   */
  sibling?: Fiber;

  /**
   * UPDATE: newFiber与oldFiber的type相同，需要更新props
   * PLACEMENT: newFiber与oldFiber的type不同，表示需要插入新的fiber
   * DELETION: oldFiber被删除
   */
  effectTag?: 'UPDATE' | 'PLACEMENT' | 'DELETION';

  hooks?: Hook[];
}

/**
 * 应当是一次render对应一个RenderContext还是一个Element对应一个RenderContext?
 * 现在的实现可以见render.ts，一次render对应一个RenderContext
 */
export interface RenderContext {
  wipRoot: Fiber;
  currentRoot: Fiber;
  deletions: Fiber[];
}
