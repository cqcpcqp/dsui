<script setup>
import { ref } from 'vue';
const sizeList = ref(['sm', 'md', 'lg']);
const colorList = ref(['danger', 'primary', 'warning', 'success', 'default']);
const color = ref('default');
const size = ref('md');
</script>

<template>
  <div class="icon-doc">
    <h1>Icon</h1>

    <ds-flex :direction="'column'" gap="20px">
      <ds-select style="width: 200px" v-model="color">
        <ds-option :value="item" v-for="item in colorList">{{ item }}</ds-option>
      </ds-select>

      <ds-select style="width: 200px" v-model="size">
        <ds-option :value="item" v-for="item in sizeList">{{ item }}</ds-option>
      </ds-select>

      <ds-icon :color="color" :size="size">
        <svg aria-hidden="true">
          <use href="#icon-info-circle"></use>
        </svg>
      </ds-icon>

      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-info-circle"></use>
      </svg>
    </ds-flex>
  </div>
</template>

<style scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
