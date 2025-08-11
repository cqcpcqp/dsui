## Package

Web components Components,

基础组件 ui/ux 增强

### UI

目前目标是确认个人 ui/ux 规范

1. button
2. input
3. select
4. checkbox
5. label

### Related Doc

[Web Components的最佳实践](https://web.dev/articles/custom-elements-best-practices?hl=zh-cn)

### Core

注意，我们不是要开发一个类似react或者preact的玩意出来，我们只是为了
1. 能够对开发提供便利
才实现了这个core，这个core应当仅仅为dsui服务

这就是为什么ds-core不会去实现ref / context api这样的功能。我们希望dsui的重心是在web component上。

### headless

提供一些朴实的业务常见逻辑

1. 跨页多选

### Line Leader

### 初始化

```bash
yarn init
```

### 开发

```bash
yarn start
```

### 发布

TODO
- 把所有的compoent改造成tsx，然后变更dsui的package.json中的main
- @Component中的template并不需要
- 更新core对应的图<https://cqcpcqp.atlassian.net/wiki/spaces/FRON/whiteboard/149094403?atl_f=PAGETREE>
