const insertStyle = (style: string) => {
  // const styleElement = document.createElement('style');
  // styleElement.textContent = style;
  // document.head.appendChild(styleElement);
  document.head.innerHTML += style;
};

const insertTemplate = (template: string) => {
  // const templateElement = document.createElement('template');
  // templateElement.innerHTML = template;
  // document.head.appendChild(templateElement);
  document.head.innerHTML += template;
};

export const templateControl = {};

interface ComponentInfo {
  select: string;
  extends?: string;
  style?: string;
  template?: string;
}

export const Component = (object: ComponentInfo) => {
  return (constructor: any) => {
    if (object.style) insertStyle(object.style);
    if (object.template) insertTemplate(object.template);
    const extendedClass = class extends constructor {
      constructor(...args: any[]) {
        super(...args);

        const properties = Object.getOwnPropertyNames(this);

        properties.forEach((property) => {
          const value = this[property];

          if (typeof value === 'function' && value.__isInputSignal) {
            const originalValue = value;
            Object.defineProperty(this, property, {
              get: () => originalValue,
              set: (newValue) => {
                originalValue?.set(newValue);
              },
              enumerable: true,
              configurable: true,
            });
          }
        });
      }
    } as any;

    customElements.define(object.select, extendedClass, { extends: object.extends });

    return extendedClass;
  };
};
