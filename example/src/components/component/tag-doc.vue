<script setup>
import { ref } from 'vue';
const typeList = ref(['warning', 'info', 'success', 'error']);
const sizeList = ref(['sm', 'md', 'lg']);
const size = ref('sm');
</script>

<template>
  <div class="tag-doc">
    <h1>Tag</h1>
    <p>状态标签</p>

    <ds-flex gap="20px">
      <ds-button v-for="s in sizeList" category="primary" @click="size = s">
        {{ s }}
      </ds-button>
    </ds-flex>

    <ds-flex gap="20px" style="margin-top: 20px">
      <ds-tag v-for="t in typeList" :size="size" :type="t">已忽略</ds-tag>
    </ds-flex>
  </div>
</template>