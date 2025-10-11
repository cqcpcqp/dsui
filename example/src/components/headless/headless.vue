<script>
import CollectionDoc from '@/components/headless/collection-doc.vue';
import OverlayDoc from '@/components/headless/overlay-doc.vue';

// TODO(cqcpcqp) 这里完全可以用selectionModel
export default {
  components: { OverlayDoc, CollectionDoc },
  data() {
    return {
      selectedItem: 'collection',
    };
  },
  mounted() {},
};
</script>

<template>
  <ds-flex style="flex: 1; height: 0">
    <ds-flex class="panel" :direction="'column'">
      <div :class="{ active: selectedItem === 'collection' }" @click="selectedItem = 'collection'">
        Collection
      </div>
      <div :class="{ active: selectedItem === 'overlay' }" @click="selectedItem = 'overlay'">
        Overlay
      </div>
    </ds-flex>

    <div class="doc-container">
      <collection-doc v-if="selectedItem === 'collection'"></collection-doc>
      <overlay-doc v-if="selectedItem === 'overlay'"></overlay-doc>
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
