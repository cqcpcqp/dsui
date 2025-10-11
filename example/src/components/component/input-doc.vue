<script>
export default {
  data() {
    return {
      withInitialValue: 'Initial Value',
      placeholderValue: '',
      nullValue: null,
      undefinedValue: undefined,
      placeholder: 'placeholder',
      size: 'md',
      sizeList: ['sm', 'md', 'lg'],
    };
  },
  mounted() {},
};
</script>

<template>
  <div class="input-doc">
    <h1>Input</h1>

    <p>输入文本内容</p>

    <ds-flex gap="20px">
      <ds-button v-for="s in sizeList" category="primary" @click="size = s">
        {{ s }}
      </ds-button>
    </ds-flex>

    <ds-flex :direction="'column'" gap="20px">
      <p>具有初始值的ds-input / {{ withInitialValue }}</p>
      <ds-input :placeholder="placeholder" :size="size" v-model="withInitialValue"></ds-input>

      <!-- <p>没有有初始值展示placeholder的ds-input/ {{ placeholderValue }}</p>
      <ds-input placeholder="placeholder" v-model="placeholderValue" size="sm"></ds-input>

      <p>nullValue / {{ nullValue }}</p>
      <ds-input placeholder="placeholder" v-model="nullValue" size="sm"></ds-input>

      <p>undefinedValue / {{ undefinedValue }}</p>
      <ds-input placeholder="placeholder" v-model="undefinedValue" size="sm"></ds-input> -->

      <p>以下为原生 文本输入功能</p>
      <input type="text" style="height: 32px; line-height: 22px" v-model="withInitialValue" />

      <input type="text" style="height: 32px; line-height: 22px" v-model="placeholder" />

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

<style scoped>
.ds-input {
  width: 200px;
}
</style>
