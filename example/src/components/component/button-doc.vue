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
      一个本身没有含义（导航，select组件中的option具有选择含义）的元素。对这个元素进行交互将触发一个action。
      这种元素是button。
    </p>
    <p>所以： circle形状，且仅包含一个图标的button是有意义的，因为完全符合button的定义。</p>

    <h2>原生</h2>
    <button>button</button>

    <p>l is: {{ l }}</p>
    <h2>Default Button</h2>
    <div style="display: flex; gap: 20px">
      <ds-button v-for="category in categories" :category="category" @click="l++">
        {{ category }}
      </ds-button>
    </div>

    <h2>OutLined Button</h2>
    <div style="display: flex; gap: 20px">
      <ds-button outline v-for="category in categories" :category="category" @click="l++">
        {{ category }}
      </ds-button>
    </div>

    <h2>Disabled Button</h2>
    <div style="display: flex; gap: 20px">
      <ds-button disabled v-for="category in categories" :category="category" @click="l++">
        {{ category }}
      </ds-button>
    </div>

    <h2>Different Size Button</h2>
    <div style="display: flex; gap: 20px">
      <ds-button :size="lg" v-for="category in categories" :category="category" @click="l++">
        {{ category }}
      </ds-button>
    </div>

    <h2>Button Icon</h2>
    <div style="display: flex; gap: 20px">
      <ds-button icon="arrow" v-for="category in categories" :category="category" @click="l++">
        {{ category }}
      </ds-button>
    </div>

    <h2>Button Loading</h2>
    <div style="display: flex; gap: 20px">
      <ds-button loading v-for="category in categories" :category="category" @click="l++">
        {{ category }}
      </ds-button>
    </div>
  </div>
</template>
