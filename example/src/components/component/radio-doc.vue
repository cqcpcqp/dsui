<script setup>
import { ref } from 'vue';

const value = ref('apple');
const size = ref('md');
const items = ref(['apple', 'orange', 'pineapple']);
const sizeList = ref(['sm', 'md', 'lg']);
</script>

<template>
  <div class="radio-doc">
    <h1>Radio</h1>

    <p>单选</p>

    <ds-flex :direction="'column'" gap="20px">
      <ds-radio-group v-model="size">
        <ds-radio-item v-for="s in sizeList" :value="s">{{ s }}</ds-radio-item>
      </ds-radio-group>

      <ds-radio-group v-model="value" name="radio-name" :size="size">
        <ds-radio-item v-for="_ in items" :value="_">{{ _ }}</ds-radio-item>
      </ds-radio-group>

      <ds-radio-group v-model="value" name="radio-name2" type="button" :size="size">
        <ds-radio-item v-for="_ in items" :value="_">{{ _ }}</ds-radio-item>
      </ds-radio-group>

      <ds-radio-group v-model="value" name="radio-name2" type="slider" :size="size">
        <ds-radio-item v-for="_ in items" :value="_">{{ _ }}</ds-radio-item>
      </ds-radio-group>
    </ds-flex>

    <p>以下为原生 选择功能</p>
    <input type="radio" id="html" name="fr" value="apple" v-model="value" />
    <label for="html">apple</label><br />
    <input type="radio" id="css" name="fr" value="orange" v-model="value" />
    <label for="orange">orange</label><br />

    <input type="radio" id="zh" name="language" value="zh" />
    <label for="javascript">zh</label><br />
    <input type="radio" id="en" name="language" value="en" />
    <label for="javascript">en</label><br />
  </div>
</template>
