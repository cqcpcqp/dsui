<script>
export default {
  data() {
    return {
      withInitialValue: '',
      placeholderValue: '',
      nullValue: null,
      undefinedValue: undefined,
      placeholder: 'placeholder',
      num: 0,
      text: 'some text',
    };
  },
  mounted() { },
};
</script>

<template>
  <div class="input-doc">
    <h1>Input</h1>

    <ds-flex :direction="'column'" gap="20px">
      <h2>尺寸</h2>
      <ds-input placeholder="small" size="sm" v-model="withInitialValue"></ds-input>
      <ds-input placeholder="medium" size="md" v-model="withInitialValue"></ds-input>
      <ds-input placeholder="large" size="lg" v-model="withInitialValue"></ds-input>

      <h2>密码框</h2>
      <ds-input :type="'password'" placeholder="password" size="md" v-model="withInitialValue"></ds-input>

      <h2>数字</h2>
      <ds-input-number placeholder="number" size="md" v-model="num" min="0" max="100"></ds-input-number>

      <h2>文本</h2>
      <ds-input-area placeholder="textarea" size="md" v-model="text"></ds-input-area>
      <span>{{ text }}</span>

      <h2>原生</h2>
      <input type="text" style="height: 32px; line-height: 22px" v-model="withInitialValue" />

      <input type="text" style="height: 32px; line-height: 22px" v-model="placeholder" />

      <fieldset>
        <legend>contenteditable div</legend>
        <div contenteditable placeholder="Basic Usage" style="outline: 1px solid grey; width: 300px; padding: 4px 8px">
        </div>
      </fieldset>

      <textarea name="" id=""></textarea>
    </ds-flex>
  </div>
</template>

<style scoped>
.ds-input,
.ds-input-number,
.ds-input-area {
  width: 200px;
}
</style>
