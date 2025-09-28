<script setup>
import { ref, onMounted } from 'vue';
import { DsFlex } from 'dsui';

const value = ref('apple');
const items = ref(['apple', 'orange']);
</script>

<template>
  <div class="radio-doc">
    <h1>Radio</h1>

    <p>单选</p>

    <ds-flex :direction="'column'" gap="20px">
      <ds-radio-group :value="value">
        <ds-radio-item v-for="_ in items" :value="_">{{ _ }}</ds-radio-item>
      </ds-radio-group>
    </ds-flex>

    <p>以下为原生 选择功能</p>
    <input type="radio" id="html" name="fav_language" value="HTML" />
    <label for="html">HTML</label><br />
    <input type="radio" id="css" name="fav_language" value="CSS" />
    <label for="css">CSS</label><br />

    <input type="radio" id="zh" name="language" value="zh" />
    <label for="javascript">zh</label><br />
    <input type="radio" id="en" name="language" value="en" />
    <label for="javascript">en</label><br />
  </div>
</template>
