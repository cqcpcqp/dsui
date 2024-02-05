export class Dropdown {
  dropdownElement: HTMLDivElement;

  constructor(private rootElement: HTMLElement) {
    this.dropdownElement = document.createElement('div');
    this.dropdownElement.style.position = 'fixed';
    this.dropdownElement.style.top = rootElement.offsetTop + rootElement.offsetHeight + 2 + 'px';
    this.dropdownElement.style.left = rootElement.offsetLeft + 'px';
    this.dropdownElement.style.width = rootElement.offsetWidth - 2 + 'px';
    this.dropdownElement.style.height = '200px';
    this.dropdownElement.style.background = 'white';
    this.dropdownElement.style['z-index'] = '4';
    this.dropdownElement.style.border = '1px solid black';
    this.dropdownElement.style['border-radius'] = '6px';

    this.dropdownElement.style['display'] = 'flex';
    this.dropdownElement.style['flex-direction'] = 'column';
    this.dropdownElement.style['overflow'] = 'auto';
  }

  create() {
    document.body.appendChild(this.dropdownElement);
    return this;
  }

  destroy(): void {
    document.body.removeChild(this.dropdownElement);
  }
}
