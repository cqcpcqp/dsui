<script>
import ButtonDoc from '@/components/component/button-doc.vue';
import FlexDoc from '@/components/component/flex-doc.vue';
import SpaceDoc from '@/components/component/space-doc.vue';
import GridDoc from '@/components/component/grid-doc.vue';
import SquareDoc from '@/components/component/square-doc.vue';
import ColumnDoc from '@/components/component/column-doc.vue';
import FieldsetDoc from '@/components/component/fieldset-doc.vue';
import LoadingDoc from '@/components/component/loading-doc.vue';
import InputDoc from '@/components/component/input-doc.vue';
import SelectDoc from '@/components/component/select-doc.vue';
import { DsFlex } from 'dsui';

export default {
  components: {
    InputDoc,
    LoadingDoc,
    FieldsetDoc,
    GridDoc,
    SpaceDoc,
    FlexDoc,
    ButtonDoc,
    SquareDoc,
    ColumnDoc,
    SelectDoc,
    DsFlex,
  },
  data() {
    return {
      selected: 'select',
    };
  },

  mounted() {},
};
</script>

<template>
  <ds-flex style="flex: 1; height: 0">
    <div class="panel">
      <div :class="{ active: selected === 'square' }" @click="selected = 'square'">Square</div>
      <div :class="{ active: selected === 'button' }" @click="selected = 'button'">Button</div>
      <div :class="{ active: selected === 'loading' }" @click="selected = 'loading'">Loading</div>
      <div :class="{ active: selected === 'column' }" @click="selected = 'column'">Column</div>
      <div :class="{ active: selected === 'flex' }" @click="selected = 'flex'">Flex</div>
      <div :class="{ active: selected === 'space' }" @click="selected = 'space'">Space</div>
      <div :class="{ active: selected === 'grid' }" @click="selected = 'grid'">Grid</div>
      <div :class="{ active: selected === 'input' }" @click="selected = 'input'">Input</div>
      <div :class="{ active: selected === 'select' }" @click="selected = 'select'">Select</div>
      <div :class="{ active: selected === 'autocomplete' }" @click="selected = 'autocomplete'">
        Autocomplete
      </div>
      <div :class="{ active: selected === 'radio' }" @click="selected = 'radio'">Radio</div>
      <div :class="{ active: selected === 'checkbox' }" @click="selected = 'checkbox'">
        Checkbox
      </div>
      <div :class="{ active: selected === 'fieldset' }" @click="selected = 'fieldset'">
        Fieldset
      </div>
    </div>

    <div class="doc-container">
      <button-doc v-if="selected === 'button'"></button-doc>
      <flex-doc v-if="selected === 'flex'"></flex-doc>
      <space-doc v-if="selected === 'space'"></space-doc>
      <grid-doc v-if="selected === 'grid'"></grid-doc>
      <square-doc v-if="selected === 'square'"></square-doc>
      <column-doc v-if="selected === 'column'"></column-doc>
      <fieldset-doc v-if="selected === 'fieldset'"></fieldset-doc>
      <loading-doc v-if="selected === 'loading'"></loading-doc>
      <input-doc v-if="selected === 'input'"></input-doc>
      <select-doc v-if="selected === 'select'"></select-doc>
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
