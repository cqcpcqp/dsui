/** 期望得到的编译结果把 */
export class OutputExample {
  test = '';

  constructor() {
    this.test = 'output example js file';
  }

  render() {
    const htmlStringTemplate = `${this.test}`;

    const p = document.createElement('p');
    p.textContent = htmlStringTemplate;

    document.body.appendChild(p);
  }
}
