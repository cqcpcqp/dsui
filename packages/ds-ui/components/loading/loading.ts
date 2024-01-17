import { Component } from 'ds-core/decorators/component';

@Component({
  select: 'ds-loading',
  style: `
    <style>
        ds-loading {
            display: block;
        }
    </style>
  `,
  template: ` <template id="ds-loading">
    <style>
      svg {
        animation: rotate 2s linear infinite;
        margin: auto;
      }

      .primary circle {
        stroke: #068cff;
      }

      .success circle {
        stroke: #22a765;
      }

      svg circle {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
        stroke-width: 10%;
        animation: dash 1.5s ease-in-out infinite;
      }

      @keyframes rotate {
        100% {
          transform: rotate(360deg);
        }
      }

      @keyframes dash {
        0% {
          stroke-dasharray: 1, 200;
          stroke-dashoffset: 0;
        }
        50% {
          stroke-dasharray: 89, 200;
          stroke-dashoffset: -35px;
        }
        100% {
          stroke-dasharray: 89, 200;
          stroke-dashoffset: -124px;
        }
      }
    </style>
    <svg viewbox="0 0 50 50">
      <circle cx="50%" cy="50%" r="20" fill="none" />
    </svg>
  </template>`,
})
export class DsLoading extends HTMLElement {
  static get observedAttributes(): string[] {
    return ['color', 'size'];
  }

  shadow;

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' });

    const template: HTMLTemplateElement = document.getElementById(
      'ds-loading',
    ) as HTMLTemplateElement;
    const templateContent = template.content;

    this.shadow.appendChild(templateContent.cloneNode(true));
  }

  connectedCallback() {
    // set color & size
    console.log(this.getAttribute('color'));
    const svg = this.shadow.querySelector('svg');
    svg.classList.add(this.getAttribute('color') || 'primary');

    const size = this.getAttribute('size');
    if (size === 'sm') {
      this.style.width = '12px';
    } else if (size === 'md') {
      this.style.width = '18px';
    } else if (size === 'lg') {
      this.style.width = '26px';
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // this.updateStyle();
  }
}
