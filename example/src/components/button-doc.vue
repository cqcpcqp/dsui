<script>
export default {
  data() {
    return {
      l: 20,
      categories: ['primary', 'success', 'danger', 'warning', 'default'],
    };
  },

  mounted() {},
};
</script>

<template>
  <div class="button-doc">
    <h1>Button</h1>

    <p>
      <a href="https://ant-design.antgroup.com/components/button-cn" target="_blank">Ant Design</a>
      按钮用于开始一个即时操作。
    </p>
    <p>
      <a href="https://tdesign.tencent.com/vue/components/button" target="_blank">TDesign</a>
      按钮用于开启一个闭环的操作任务，如“删除”对象、“购买”商品等。
    </p>
    <p>
      <a href="https://arco.design/react/components/button" target="_blank">arco design</a>
      按钮是一种命令组件，可发起一个即时操作
    </p>
    <p>
      <a href="https://element.eleme.cn/#/zh-CN/component/button" target="_blank">Element</a>
      常用的操作按钮。
    </p>
    <p>
      <a href="https://youzan.github.io/zent/zh/component/button" target="_blank">Zent</a>
      用于触发操作的可点击元素。用来传达用户可以执行的操作并允许用户与页面交互。
    </p>
    <p>
      <a href="https://fluent2.microsoft.design/components/web/react/button/usage" target="_blank">
        Fluent
      </a>
      A button triggers a single action or event. Use buttons for important actions like submitting
      a response, committing a change, or moving to the next step. For navigating to another place,
      try a link instead.
    </p>
    <p>
      <a href="https://m3.material.io/components/all-buttons" target="_blank"> Material </a>
      Buttons let people take action and make choices with one tap
    </p>

    <p>
      一个本身没有含义（导航，select组件中的option具有选择含义）的元素。对这个元素进行交互将触发一个action。
      这种元素是button。
    </p>
    <p>所以： circle形状，且仅包含一个图标的button是有意义的，因为完全符合button的定义。</p>

    <h2>原生</h2>
    <button>button</button>

    <p>l is: {{ l }}</p>
    <h2>Default Button</h2>
    <div style="display: flex; gap: 20px">
      <button is="ds-button" v-for="category in categories" :category="category" @click="l++">
        {{ category }}
      </button>
    </div>

    <h2>OutLined Button</h2>
    <div style="display: flex; gap: 20px">
      <button
        is="ds-button"
        outline
        v-for="category in categories"
        :category="category"
        @click="l++"
      >
        {{ category }}
      </button>
    </div>

    <h2>Disabled Button</h2>
    <div style="display: flex; gap: 20px">
      <button
        is="ds-button"
        disabled
        v-for="category in categories"
        :category="category"
        @click="l++"
      >
        {{ category }}
      </button>
    </div>

    <h2>Different Size Button</h2>
    <div style="display: flex; gap: 20px">
      <button
        is="ds-button"
        :size="lg"
        v-for="category in categories"
        :category="category"
        @click="l++"
      >
        {{ category }}
      </button>
    </div>

    <h2>Button Icon</h2>
    <div style="display: flex; gap: 20px">
      <button
        is="ds-button"
        icon="arrow"
        v-for="category in categories"
        :category="category"
        @click="l++"
      >
        {{ category }}
      </button>
    </div>

    <h2>Button Loading</h2>
    <div style="display: flex; gap: 20px">
      <button
        is="ds-button"
        loading
        v-for="category in categories"
        :category="category"
        @click="l++"
      >
        {{ category }}
      </button>
    </div>
  </div>
</template>
