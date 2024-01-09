<script>
import { DsColumn, DsColumnItem } from 'dsui';

export default {
  components: { DsColumn, DsColumnItem },
  data() {
    return {};
  },

  mounted() {},
};
</script>

<style>
.column-doc {
  padding: 0 10px 20px 0;
}
</style>

<template>
  <div class="column-doc">
    <h1>Column</h1>

    <ul style="columns: 2">
      <li>long stringlong stringlong stringlong stringlong stringlong string</li>
      <li>long stringlong stringlong stringlong stringlong stringlong string</li>
      <li>long stringlong stringlong stringlong stringlong stringlong string</li>
      <li>long stringlong stringlong stringlong stringlong stringlong string</li>
    </ul>

    <div
      style="
        columns: 2;
        column-rule: 1px dashed deepskyblue;
        border: 1px solid black;
        padding: 10px;
        column-gap: 10px;
      "
    >
      <div style="margin-bottom: 10px; width: 200px; height: 100px; background: green"></div>
      <div style="margin-bottom: 10px; width: 200px; height: 100px; background: green"></div>
      <div style="margin-bottom: 10px; width: 200px; height: 100px; background: green"></div>
      <div style="margin-bottom: 10px; width: 100px; height: 100px; background: green"></div>
      <div style="margin-bottom: 10px; width: 200px; height: 100px; background: green"></div>
      <div style="margin-bottom: 10px; width: 300px; height: 100px; background: green"></div>
    </div>

    <p>单行两端对齐布局</p>

    <div style="width: 300px; border: solid deepskyblue; column-count: 3; column-gap: 5%">
      <div style="height: 100px; background: deeppink"></div>
      <div style="height: 100px; background: deeppink"></div>
      <div style="height: 100px; background: deeppink"></div>
    </div>

    <p>count 3 / gap 20px</p>

    <ds-column :count="3" :rule="true" :gap="'20px'" style="border: solid deepskyblue">
      <ds-column-item>
        <ds-square :size="100" :color="'deeppink'"></ds-square>
      </ds-column-item>
      <ds-column-item>
        <ds-square :size="100" :color="'deeppink'"></ds-square>
      </ds-column-item>
      <ds-column-item>
        <ds-square :size="100" :color="'deeppink'"></ds-square>
      </ds-column-item>
    </ds-column>
  </div>
</template>
