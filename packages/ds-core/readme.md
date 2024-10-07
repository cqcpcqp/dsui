我感觉依赖注入蛮好的 有必要实现一下，这个service让人感觉很舒服

signal也蛮好的，这个信号机制也可以留一下

那么我理解这个项目就变得更加宏大了。
1. 应该提供原生的web-components组件，可以直接拿出去用
2. 基于两种呈现方式构造的ds-ui, 虚拟dom / signal
3. 类似cdk的工具库 - ds-headless 

// @customElements({
// selector: 'ds-square',
// styleUrls: ['./square.sass'],
// })
// export class Square extends HTMLElement {