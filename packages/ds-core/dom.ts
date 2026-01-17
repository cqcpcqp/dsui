import { FiberType, HostComponentType, Fiber } from './model';
import { COMPONENT_INSTANCE_SYMBOL } from './symbol';

const isEvent = (key) => key.startsWith('on');
const isProperty = (key) => key !== 'children' && !isEvent(key);
function isHostComponentType(type: FiberType): type is HostComponentType {
  return typeof type !== 'function' && type !== undefined;
}

const isNew = (prev, next) => (key) => prev[key] !== next[key];
const isGone = (prev, next) => (key) => !(key in next);

const attributeAliases = {
  className: 'class',
  htmlFor: 'for',
};

function shouldUseSetAttribute(dom: Element, propName: string): boolean {
  // 特殊处理的属性列表
  const specialProps = ['class', 'for', 'href', 'viewBox', 'd', 'cx', 'cy', 'r'];

  // SVG/MathML 元素的所有属性都使用 setAttribute
  const isSvgOrMathML =
    dom.namespaceURI === 'http://www.w3.org/2000/svg' ||
    dom.namespaceURI === 'http://www.w3.org/1998/Math/MathML';

  return isSvgOrMathML || specialProps.includes(propName);
}

export function updateDom(dom, prevProps, nextProps) {
  // TODO(cqcpcqp) 这里有个bug，对于function component 它们是没有dom的 但是updateDom这里还是在操作自身dom
  //Remove old or changed event listeners
  Object.keys(prevProps)
    .filter(isEvent)
    .filter((key) => !(key in nextProps) || isNew(prevProps, nextProps)(key))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      dom.removeEventListener(eventType, prevProps[name]);
    });

  // Remove old properties
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(prevProps, nextProps))
    .forEach((name) => {
      dom[name] = '';
    });

  // Set new or changed properties
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => {
      const actualName = attributeAliases[name] || name;
      if (name === 'style' && typeof nextProps[name] === 'object') {
        const styleObj = nextProps[name];
        Object.keys(styleObj).forEach((styleName) => {
          dom.style[styleName] = styleObj[styleName];
        });
      } else if (shouldUseSetAttribute(dom, name)) {
        dom.setAttribute(actualName, nextProps[name]);
      } else {
        dom[name] = nextProps[name];
      }
    });

  // Add event listeners
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      const callback = nextProps[name];

      // 自动绑定组件实例的 this 不然的话对于
      // <input onInput={this.handleChange}></input>
      // handleChange中的this其实指向的是input元素而不是组件实例
      // 需要向上查找 DOM 树，找到最近的包含 __componentInstance 的组件
      const getComponentInstance = (element: Node): any => {
        let current: Node | null = element;

        while (current) {
          if ((current as any)[COMPONENT_INSTANCE_SYMBOL]) {
            return (current as any)[COMPONENT_INSTANCE_SYMBOL];
          }

          // 向上查找，包括跨越 shadow DOM 边界
          // 如果在 shadow DOM 中，查找 host
          if ((current as any).assignedSlot) {
            current = (current as any).assignedSlot;
          } else if ((current as any).getRootNode) {
            const root = (current as any).getRootNode();
            if (root instanceof ShadowRoot) {
              current = root.host;
            } else {
              current = (current as any).parentNode;
            }
          } else {
            current = (current as any).parentNode;
          }
        }

        return null;
      };

      dom.addEventListener(eventType, function (event) {
        const componentInstance = getComponentInstance(dom);
        if (componentInstance) {
          return callback.call(componentInstance, event);
        }
        return callback.call(this, event);
      });
    });
}

// 辅助函数判断是否是 SVG 元素类型
function isSvgElementType(type: string): boolean {
  const svgTags = ['svg', 'path', 'circle', 'rect', 'use', 'symbol', 'g', 'line', 'polygon'];
  return svgTags.includes(type);
}

// Create Dom From Fiber
export function createDom(fiber: Fiber): HTMLElement | Text {
  if (!isHostComponentType(fiber.type)) {
    throw new Error('Function component cannot be used as DOM element');
  }

  let dom;
  if (fiber.type === 'TEXT_ELEMENT') {
    dom = document.createTextNode('');
  } else if (isSvgElementType(fiber.type)) {
    // SVG 元素使用 createElementNS
    dom = document.createElementNS('http://www.w3.org/2000/svg', fiber.type);
  } else {
    dom = document.createElement(fiber.type);
  }

  updateDom(dom, {}, fiber.props);

  return dom;
}
