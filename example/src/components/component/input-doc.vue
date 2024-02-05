<script>
import { DsInput, DsFlex } from 'dsui';
export default {
  components: { DsInput, DsFlex },
  data() {
    return {
      v: 'Initial Value',
    };
  },

  mounted() {},
};
</script>

<template>
  <div class="input-doc">
    <h1>Input</h1>

    <p>输入文本内容</p>

    <ds-flex :direction="'column'">
      <input is="ds-input" placeholder="Basic Usage" v-model="v" />

      <input
        type="text"
        placeholder="Basic Usage"
        style="height: 32px; line-height: 22px"
        v-model="v"
      />

      <fieldset>
        <legend>contenteditable div</legend>
        <div
          contenteditable
          placeholder="Basic Usage"
          style="outline: 1px solid grey; width: 300px; padding: 4px 8px"
        ></div>
      </fieldset>
    </ds-flex>
  </div>
</template>
