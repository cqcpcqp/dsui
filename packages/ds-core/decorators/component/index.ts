const insertScript = (style: string) => {
  document.head.innerHTML += style;
};

const insertTemplate = (template: string) => {
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
    if (object.style) insertScript(object.style);
    if (object.template) insertTemplate(object.template);

    customElements.define(object.select, constructor, { extends: object.extends });

    return constructor;
  };
};
