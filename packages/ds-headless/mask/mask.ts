export class Mask {
  overlayElement: HTMLDivElement;

  controller = new AbortController();

  func;

  constructor() {
    this.overlayElement = document.createElement('div');
    this.overlayElement.style.position = 'fixed';
    this.overlayElement.style.top = '0';
    this.overlayElement.style.left = '0';
    this.overlayElement.style.width = '100%';
    this.overlayElement.style.height = '100%';
    // this.overlayElement.style.background = 'rgba(0, 0, 0, 0.5)';
    this.overlayElement.style['z-index'] = '3';

    this.overlayElement.addEventListener(
      'click',
      () => {
        this.destroy();
      },
      { signal: this.controller.signal },
    );
  }

  create() {
    document.body.appendChild(this.overlayElement);
    return this;
  }

  destroy(): void {
    document.body.removeChild(this.overlayElement);
    this.func();
  }

  close(func): void {
    this.func = func;
  }
}
