<script setup>
import { ref } from 'vue';
const sizeList = ref(['sm', 'md', 'lg']);
const size = ref('md');
let showExtra = ref(false);
let labelFlex = ref(1);
let inputFlex = ref(4);
let placeholder = ref('Please Select')

let lab = ref('1')

const switchFlex = () => {
  [labelFlex.value, inputFlex.value] = [inputFlex.value, labelFlex.value];
}
</script>

<template>
  <div class="form-doc">
    <h1>Form</h1>

    <ds-flex direction="column" gap="20px">
      <h2>使用</h2>

      <ds-radio-group v-model="size">
        <ds-radio-item v-for="s in sizeList" :value="s">{{ s }}</ds-radio-item>
      </ds-radio-group>

      <ds-form :labelFlex="labelFlex" :inputFlex="inputFlex" :size="size">

        <ds-form-item label="Account">
          <ds-input placeholder="username"></ds-input>
        </ds-form-item>

        <ds-form-item label="Password">
          <ds-input type="password"></ds-input>
        </ds-form-item>

        <ds-form-item label="Age">
          <ds-input-number></ds-input-number>
        </ds-form-item>

        <ds-form-item label="Company">
          <ds-select :placeholder="placeholder">
            <ds-option :value="0">Disney</ds-option>
            <ds-option :value="1">Pixel</ds-option>
          </ds-select>
        </ds-form-item>

        <ds-form-item label="Enable SSR">
          <ds-radio-group>
            <ds-radio-item :value="true">True</ds-radio-item>
            <ds-radio-item :value="false">False</ds-radio-item>
          </ds-radio-group>
        </ds-form-item>

        <ds-form-item label="Extra" v-if="showExtra">
          <ds-input name="extra"></ds-input>
        </ds-form-item>

        <ds-button :category="'primary'" @click="showExtra = !showExtra">
          新增/删除form-item
        </ds-button>

        <ds-button :category="'primary'" @click="switchFlex()">
          变更labelFlex和inputFlex
        </ds-button>
      </ds-form>

      <h2>原生</h2>

      <form action="" method="get" class="form-example">
        <div class="form-example">
          <label for="name">Enter your name: </label>
          <input type="text" name="name" id="name" required />
        </div>
        <div class="form-example">
          <label for="email">Enter your email: </label>
          <input type="email" name="email" id="email" required />
        </div>
        <div class="form-example">
          <input type="submit" value="Subscribe!" />
        </div>
      </form>

      <!-- 向当前 URL 发送 GET 请求的表单 -->
      <form method="get">
        <label> 姓名：<input name="submitted-name" autocomplete="name" /> </label>
        <button>保存</button>
      </form>

      <!-- 向当前 URL 发送 POST 请求的表单 -->
      <form method="post">
        <label> 姓名：<input name="submitted-name" autocomplete="name" /> </label>
        <button>保存</button>
      </form>

      <!-- 带有字段集（fieldset）、标题（legend）和标签（label）的表单 -->
      <form method="post">
        <fieldset>
          <legend>是否同意该条款？</legend>
          <label><input type="radio" name="radio" value="yes" />是</label>
          <label><input type="radio" name="radio" value="no" />否</label>
        </fieldset>
      </form>
    </ds-flex>
  </div>
</template>

<style scoped>
.ds-input {
  width: 200px;
}
</style>
