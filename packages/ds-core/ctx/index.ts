class InjectToken {
  constructor(public readonly str: string) {}
}

export function createInjectToken(str: string) {
  return new InjectToken(str);
}

interface ProvidedContext {
  [key: string]: any;
}

declare global {
  interface HTMLElement {
    _provided?: ProvidedContext;
  }
}

export function provide(token: InjectToken, value: any) {
  // 在构造函数中调用时，this 指向组件实例
  const component = this as HTMLElement;

  if (!component._provided) {
    component._provided = {};
  }

  component._provided[token.str] = value;
}

export function inject(token: InjectToken): any {
  // 在构造函数或组件方法中调用时，this 指向组件实例
  const component = this as HTMLElement;

  // 沿着 DOM 树向上查找
  let parent = component.parentElement;

  while (parent) {
    if (parent._provided && token.str in parent._provided) {
      return parent._provided[token.str];
    }
    parent = parent.parentElement;
  }

  // 如果没有找到，返回 undefined
  return undefined;
}
