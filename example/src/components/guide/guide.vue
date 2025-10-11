<script>
import ColorDoc from '@/components/guide/color-doc.vue';

export default {
  components: {
    ColorDoc,
  },
  data() {
    return {
      selected: 'colors',
    };
  },

  mounted() {},
};
</script>

<template>
  <ds-flex style="flex: 1; height: 0">
    <div class="panel">
      <div :class="{ active: selected === 'fieldset' }" @click="selected = 'colors'">Colors</div>
    </div>

    <div class="doc-container">
      <color-doc v-if="selected === 'colors'"></color-doc>
    </div>
  </ds-flex>
</template>

<style scoped>
.panel {
  display: flex;
  flex-direction: column;
  width: 180px;
  border-right: 1px solid black;
  flex-shrink: 0;
  padding: 12px 8px;
}
.panel > div {
  cursor: pointer;
}
.panel > div.active {
  color: blue;
}
.panel > div:hover {
  color: blue;
  opacity: 0.5;
}
.doc-container {
  overflow: auto;
  padding: 0 8px 12px 8px;
  flex: 1;
}
</style>
