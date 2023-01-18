import { Component } from 'ds-core/decorators/component';

const makeIcon = (iconName: string) => {
  const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const iconUse: SVGUseElement = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  iconUse.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#icon-' + iconName);
  icon.classList.add('icon');
  icon.classList.add('tui-btn-icon-left');
  icon.appendChild(iconUse);
  return icon;
};

@Component({
  select: 'ds-button',
  extends: 'button',
  style: `
    <style>
        .tui-btn-icon-left {
            display: inline-block;
            width: 16px;
            height: 16px;
            margin-right: 12px;
            fill: blue;
        }
        button[is="ds-button"] {
            height: 32px;
            padding: 4px 12px;
            font-size: 14px;
            line-height: 22px;
            text-align: center;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border-radius: 6px;
            cursor: pointer;
            text-decoration: none;
            position: relative;
            overflow: hidden;
            margin: 0;
            text-transform: none;
            color: #FFFFFF;
            border: 1px solid transparent;
        }
        button[is="ds-button"]:hover {
            filter: brightness(105%);
        }
        button[is="ds-button"][category="primary"] {
            background-color: #068CFF;
            border: 1px solid #068CFF;
        }
        button[is="ds-button"][category="success"] {
            background-color: #22A765;
            border-color: #22A765;
        }
        button[is="ds-button"][category="danger"] {
            background-color: #DD4B4B;
            border-color: #DD4B4B;
        }
        button[is="ds-button"][category="warning"] {
            background-color: #EF8B16;
            border-color: #EF8B16;
        }
        button[is="ds-button"][category="default"] {
            background-color: #D3DAED;
            border-color: #D3DAED;
        }
        button[is="ds-button"][outline] {
            background-color: transparent !important;
        }
        button[is="ds-button"][outline][category="primary"] {
            border-color: #068CFF;
            color: #068CFF;
        }
        button[is="ds-button"][outline][category="success"] {
            border-color: #22A765;
            color: #22A765;
        }
        button[is="ds-button"][outline][category="danger"] {
            border-color: #DD4B4B;
            color: #DD4B4B;
        }
        button[is="ds-button"][outline][category="warning"] {
            border-color: #EF8B16;
            color: #EF8B16;
        }
        button[is="ds-button"][outline][category="default"] {
            border-color: #D3DAED;
            color: #292929;
        }
        button[is="ds-button"][disabled] {
            background-color: #FAFBFC;
            border-color: #FAFBFC;
            color: #B6BDB1;
            cursor: not-allowed;
            box-shadow: none;
        }
        .button-icon {
            display: inline-block;
            width: 20px;
            height: 20px;
        }
        .ds-btn-ripple-circle-color {
          background: #068CFF;
          filter: opacity(0.5);
        }
        .ds-btn-ripple-circle {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            opacity: 0;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, .25);
            pointer-events: none;
            animation: btn-ripple .5s ease-in;
        }
        @keyframes btn-ripple {
            0% {
                opacity: 0;
            }
            25% {
                opacity: 1;
            }
            100% {
                width: 200%;
                padding-bottom: 200%;
                opacity: 0;
            }
        }
    </style>`,
})
export class DsButton extends HTMLButtonElement {
  static get observedAttributes(): string[] {
    return ['category', 'disabled', 'icon', 'loading', 'outlined', 'size'];
  }

  controller = new AbortController();

  constructor() {
    super();
    this.addEventListener(
      'click',
      (event) => {
        const btnRippleCircle = document.createElement('span');
        btnRippleCircle.classList.add('ds-btn-ripple-circle');
        btnRippleCircle.classList.add('ds-btn-ripple-circle-color');
        btnRippleCircle.style.top = event.offsetY + 'px';
        btnRippleCircle.style.left = event.offsetX + 'px';
        this.appendChild(btnRippleCircle);
        setTimeout(() => {
          this.removeChild(btnRippleCircle);
        }, 500);
      },
      { signal: this.controller.signal },
    );
  }

  adoptedCallback() {
    this.controller.abort();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'loading') {
      console.log(name, oldValue, newValue);

      // const svg = document.createElement('svg');
      // svg.classList.add('icon');
      // const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
      // use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#icon-loading');
      // svg.appendChild(use);

      const svg = makeIcon('loading');
      this.appendChild(svg);
    }
    this.updateStyle();
  }

  updateStyle(): void {}
}
