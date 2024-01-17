<script>
import ButtonDoc from '@/components/button-doc.vue';
import FlexDoc from '@/components/flex-doc.vue';
import SpaceDoc from '@/components/space-doc.vue';
import GridDoc from '@/components/grid-doc.vue';
import SquareDoc from '@/components/square-doc.vue';
import ColumnDoc from '@/components/column-doc.vue';
import FieldsetDoc from '@/components/fieldset-doc.vue';
import LoadingDoc from '@/components/loading-doc.vue';

export default {
  components: {
    LoadingDoc,
    FieldsetDoc,
    GridDoc,
    SpaceDoc,
    FlexDoc,
    ButtonDoc,
    SquareDoc,
    ColumnDoc,
  },
  data() {
    return {
      selected: 'flex',
    };
  },

  mounted() {},
};
</script>

<template>
  <div class="container">
    <div class="panel">
      <div class="title">测试</div>
      <div class="item" @click="selected = 'square'">square</div>

      <div class="title">原生</div>
      <div class="item" @click="selected = 'button'">button</div>
      <div class="item" @click="selected = 'loading'">loading</div>

      <div class="title">布局</div>
      <div class="item" @click="selected = 'column'">column</div>
      <div class="item" @click="selected = 'flex'">flex</div>
      <div class="item" @click="selected = 'space'">space</div>
      <div class="item" @click="selected = 'grid'">grid</div>

      <div class="title">输入</div>
      <div class="item" @click="selected = 'input'">input</div>
      <div class="item" @click="selected = 'select'">select</div>
      <div class="item" @click="selected = 'autocomplete'">autocomplete</div>
      <div class="item" @click="selected = 'radio'">radio</div>
      <div class="item" @click="selected = 'checkbox'">checkbox</div>
      <div class="item" @click="selected = 'fieldset'">fieldset</div>
    </div>

    <button-doc v-if="selected === 'button'"></button-doc>
    <flex-doc v-else-if="selected === 'flex'"></flex-doc>
    <space-doc v-else-if="selected === 'space'"></space-doc>
    <grid-doc v-else-if="selected === 'grid'"></grid-doc>
    <square-doc v-else-if="selected === 'square'"></square-doc>
    <column-doc v-else-if="selected === 'column'"></column-doc>
    <fieldset-doc v-else-if="selected === 'fieldset'"></fieldset-doc>
    <loading-doc v-else-if="selected === 'loading'"></loading-doc>
  </div>
</template>

<style scoped>
.panel {
  display: flex;
  flex-direction: column;
  width: 180px;
  border-right: 1px solid black;
  flex-shrink: 0;
  margin-right: 10px;
  padding: 10px;
}

.title {
  margin: 15px 5px 5px 5px;
  border-bottom: 1px solid black;
}

.item {
  cursor: pointer;
}

.container {
  display: flex;
}
</style>
