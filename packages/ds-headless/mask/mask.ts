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

/**
 * 术语 | 区别说明 | 示例场景 |
 * ​​Overlay​​ | 广义的覆盖层，可能是透明/半透明/不透明的 | 模态弹窗、全局遮罩
 * ​Modal​​ | 特指需要用户交互的覆盖层（必须关闭才能操作下层）| 登录弹窗、确认对话框
 *  - 模态：特定的操作模式
 *  - 强调的是系统的状态切换
 *  - 这是一个必须处理的临时模式，就像游戏中的暂停弹窗
 * ​Popover​​ | 小型的非模态叠加层（点击外部可关闭）| 工具提示、气泡说明
 * ​Tooltip​​ | 信息提示类微型覆盖层（通常悬停触发）| 按钮的说明文字
 * ​Backdrop​​ | 专指模态层下方的背景遮罩（如点击关闭功能）| Modal 背后的半透明黑色层
 * ​Mask​​ | 用于部分遮挡内容的覆盖层（如图片裁剪遮罩）| 图片编辑器的裁剪区域
 * ​Toast​​ | 临时性非阻塞覆盖层（自动消失）|操作成功的右上角提示
 * 
 * 1. ​​覆盖层无法点击下层​
 * 2. 滚动穿透（Scroll Bleed）​
 * 
 * 大概看了下ant-design的玩法哈 select - rc-select - trigger - popup
 * 人家的组织形式单纯的就是一个组件拼一个组件 最后一个人Trigger写在界面上，上面的popup属性绑定了一个react的节点
 * 一会儿再去看看modal，还是一样用trigger吗？
 * 最后再看看这个mask这些具体是怎么画上的，因为不会react所以看的有点吃力。。
 * 
 */
