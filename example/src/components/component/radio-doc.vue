<script setup>
import { ref } from 'vue';

const value = ref('apple');
const items = ref(['apple', 'orange']);
</script>

<template>
  <div class="radio-doc">
    <h1>Radio</h1>

    <p>单选</p>

    <ds-flex :direction="'column'" gap="20px">
      <ds-radio-group v-model="value">
        <ds-radio-item v-for="_ in items" :value="_">{{ _ }}</ds-radio-item>
      </ds-radio-group>
    </ds-flex>

    <p>以下为原生 选择功能</p>
    <input type="radio" id="html" name="apple" value="apple" v-model="value" />
    <label for="html">apple</label><br />
    <input type="radio" id="css" name="orange" value="orange" v-model="value" />
    <label for="orange">orange</label><br />

    <input type="radio" id="zh" name="language" value="zh" />
    <label for="javascript">zh</label><br />
    <input type="radio" id="en" name="language" value="en" />
    <label for="javascript">en</label><br />
  </div>
</template>
