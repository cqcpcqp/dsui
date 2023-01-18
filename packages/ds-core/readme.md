Split html / css / javascript
@component
maybe not do the split do tsx, all in js

参考 angular / litElement  / 或者自己写吧 实现一套像quark的东西也不参考了

做成quark的话，事实上是要自己写框架的呢。或者说自己写库。

我感觉依赖注入蛮好的 有必要实现一下，这个service让人感觉很舒服

signal也蛮好的，这个信号机制也可以留一下

那么我理解这个项目就变得更加宏大了。
1. 应该提供原生的web-components组件，可以直接拿出去用
2. 基于两种呈现方式构造的ds-ui, 虚拟dom / signal
3. 类似cdk的工具库 - ds-headless 

// @customElements({
// selector: 'ds-square',
// templateUrl: './square.html',
// styleUrls: ['./square.sass'],
// })
// export class Square extends HTMLElement {

// 。。。。

用虚拟dom来实现也可以，用angular这套来实现也可以，或者就自己搓一套也可以呗。

自己写库的话，语法：

双向绑定的 {{ }}
对prop的绑定
