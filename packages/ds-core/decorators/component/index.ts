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

export const Component = (object: ComponentInfo) => {
  return (constructor: any) => {
    const style = object.style || '';
    const template = object.template || '';
    insertTemplate(object.select, style, template);

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

      constructor(...args: any[]) {
        super(...args);

        // 在super后执行，意味着无法在constructor中正常使用shadowRoot
        this._appendTemplate();

        this._patchInputProperty();
      }
    } as any;

    customElements.define(object.select, extendedClass);

    return extendedClass;
  };
};
