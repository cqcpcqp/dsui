import { Ds, effect } from '../..';
import { DEFAULT_BINDING_KEY } from '../../signal/model';
import { INPUT_SIGNAL_SYMBOL, MODEL_SIGNAL_SYMBOL, SIGNAL_ALIAS_SYMBOL } from '../../signal/symbol';
import { COMPONENT_INSTANCE_SYMBOL } from '../../symbol';

const getTemplateIdBySelect = (select) => `${select}-template`;

const insertTemplate = (select: string, style: string, template: string) => {
  const templateId = getTemplateIdBySelect(select);

  // 检查模板是否已存在
  if (document.getElementById(templateId)) {
    console.warn(`Template with id "${templateId}" already exists. Skipping insertion.`);
    return;
  }

  const templateElement = document.createElement('template');
  templateElement.id = templateId;

  templateElement.innerHTML = `<style>${style}</style>${template}`;
  document.head.appendChild(templateElement);
};

export const templateControl = {};

interface ComponentInfo {
  select: string;
  style?: string;
  template?: string;
}

function patchInputProperty(c, property) {
  const value = c[property];
  const originalValue = value;

  // 本质问题是外部直接读component的value属性，它希望这个value读到是一个值。
  // 而在组件内书写的时候我还是希望它是一个signal function。这两点矛盾了
  // 所以我们塞了一个alias，一个供给给外部，希望外部表现上与寻常的web component一致
  // 一个供给内部，
  const prop = originalValue[SIGNAL_ALIAS_SYMBOL];

  Object.defineProperty(c, prop, {
    get: () => originalValue(),
    // 这里的set方法是为了让外部可以通过赋值的方式来修改input signal的值
    // Vue对Web Component的处理
    // - 如果属性已定义在元素上，使用el[property] = value 我们属于这种情况 并且做了兼容
    // - 否则使用 el.setAttribute(key, value)
    set: (newValue) => originalValue?.set(newValue),
    enumerable: true,
    configurable: true,
  });

  // 如果外部通过attribute传入了初始值，则进行一次赋值
  // 可能出现外部在patchInputProperty之前外部就进行patch的情况 例如vue会insertHtml会直接赋值给attribute
  const attrValue = c.getAttribute(prop);
  if (attrValue !== null) {
    c[prop] = attrValue;
  }
}

function patchModelProperty(c, property) {
  const value = c[property];
  const originalValue = value;
  const prop = originalValue[SIGNAL_ALIAS_SYMBOL] || DEFAULT_BINDING_KEY;

  Object.defineProperty(c, prop, {
    get: () => originalValue(),
    // 这里的set方法是为了让外部可以通过赋值的方式来修改model signal的值
    set: (newValue) => originalValue?.set(newValue),
    enumerable: true,
    configurable: true,
  });

  // 如果外部通过attribute传入了初始值，则进行一次赋值
  // 可能出现外部在patchInputProperty之前外部就进行patch的情况 例如vue会insertHtml会直接赋值给attribute
  const attrValue = c.getAttribute(prop);
  if (attrValue !== null) {
    c[prop] = attrValue;
  }
}

export const Component = (object: ComponentInfo) => {
  return (constructor: any) => {
    const style = object.style || '';
    const template = object.template || '';
    insertTemplate(object.select, style, template);

    const userDefinedConnectedCallback = constructor.prototype.connectedCallback;
    constructor.prototype.connectedCallback = function () {
      if (userDefinedConnectedCallback) {
        userDefinedConnectedCallback.call(this);
      }

      // 在connectedCallback中内置变更检测逻辑，通过effect使得render中以来的所有signal型有变更
      // 则全量的（非细粒度）的进行一次render
      effect(() => {
        this._render();
      });
    };

    const extendedClass = class extends constructor {
      private _appendTemplate() {
        this.attachShadow({ mode: 'open' });
        const template: HTMLTemplateElement = document.getElementById(
          getTemplateIdBySelect(object.select),
        ) as HTMLTemplateElement;
        const templateContent = template.content;
        this.shadowRoot.appendChild(templateContent.cloneNode(true));
      }

      private _patchInputProperty() {
        const properties = Object.getOwnPropertyNames(this);

        properties.forEach((property) => {
          const value = this[property];

          if (typeof value === 'function' && value[INPUT_SIGNAL_SYMBOL]) {
            patchInputProperty(this, property);
          }

          if (typeof value === 'function' && value[MODEL_SIGNAL_SYMBOL]) {
            patchModelProperty(this, property);
          }
        });
      }

      private _patchRender() {
        this._render = () => {
          if (typeof this.render === 'function') {
            Ds.render(this.render(), this.shadowRoot as any);
          }
        };
      }

      constructor(...args: any[]) {
        super(...args);

        // 保存组件实例到 DOM 上，用于事件处理时自动绑定 this
        (this as any)[COMPONENT_INSTANCE_SYMBOL] = this;

        // 在super后执行，意味着无法在constructor中正常使用shadowRoot
        this._appendTemplate();

        this._patchInputProperty();

        this._patchRender();
      }
    } as any;

    customElements.define(object.select, extendedClass);

    return extendedClass;
  };
};
