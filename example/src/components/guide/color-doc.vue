<script>
import { generate } from 'dsui';

const STROKE = 5;

export default {
  data() {
    return {
      colors: ['#04F06A', '#E63946', '#648DE5', '#F86624', '#FFF94F', '#BE3E82'].map(generate),
    };
  },

  beforeDestroy() {},

  methods: {},
};
</script>

<template>
  <div class="color-doc">
    <div class="palette-container">
      <ds-flex direction="column" v-for="c in colors">
        <div
          style="width: 200px; height: 40px"
          v-for="(cc, index) in c"
          :style="{ background: cc }"
        >
          {{ cc }} - {{ index }}
        </div>
      </ds-flex>
    </div>
  </div>
</template>

<style>
.palette-container {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}
</style>
