<script setup>
import { ref, onMounted } from 'vue';

const placeholder = ref('placeholder');
const size = ref('md');
const withInitialValue = ref(null);
const items = ref(
  [
    'dog',
    'cat',
    'hamster',
    'parrot',
    'overflow_0',
    'overflow_1',
    'overflow_2',
    'overflow_3',
    'overflow_4',
    'overflow_5',
    'overflow_6',
    'overflow_7',
  ].map((i) => {
    return {
      value: i,
      label: i.toUpperCase(),
    };
  }),
);
</script>

<template>
  <div class="input-doc">
    <h1>Select</h1>

    <p>选择选项</p>
    <p>
      但是希望交互表现上与原生select/option一致。所以会给select的dropdown加蒙层
      （会导致像material一样，在打开dropdown之后所有hover效果都失效，一定要点击一次，关掉蒙层后才能与页面进行交互）。
      更显著的区别是，在打开dropdown之后能否再进行滚动之类的操作。
    </p>

    <ds-flex :direction="'column'" gap="20px">
      <p>具有初始值的ds-select / {{ withInitialValue }}</p>
      <ds-select
        :placeholder="placeholder"
        :size="'sm'"
        style="width: 200px"
        v-model="withInitialValue"
      >
        <ds-option :value="item.value" v-for="item in items">{{ item.label }}</ds-option>
      </ds-select>

      <ds-select
        :placeholder="placeholder"
        :size="'md'"
        style="width: 200px"
        v-model="withInitialValue"
      >
        <ds-option :value="item.value" v-for="item in items">{{ item.label }}</ds-option>
      </ds-select>

      <ds-select
        :placeholder="placeholder"
        :size="'lg'"
        style="width: 200px"
        v-model="withInitialValue"
      >
        <ds-option :value="item.value" v-for="item in items">{{ item.label }}</ds-option>
      </ds-select>

      <p>以下为原生 选择功能</p>
      <select name="pets" id="pet-select" v-model="withInitialValue">
        <option value="">--Please choose an option--</option>
        <option :value="item.value" v-for="item in items">{{ item.label }}</option>
      </select>
    </ds-flex>
  </div>
</template>
