<script setup>
import { ref } from 'vue';
const sizeList = ref(['sm', 'md', 'lg']);
const size = ref('sm');
let showExtra = ref(false);
let labelFlex = ref(1);
let inputFlex = ref(4);
let placeholder = ref('Please Select');

const switchFlex = () => {
  [labelFlex.value, inputFlex.value] = [inputFlex.value, labelFlex.value];
}
</script>

<template>
  <div class="form-doc">
    <ds-flex direction="column" gap="20px">
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

      <ds-flex gap="20px">
        <ds-button v-for="s in sizeList" category="primary" @click="size = s">
          {{ s }}
        </ds-button>
      </ds-flex>

      <ds-form :labelFlex="labelFlex" :inputFlex="inputFlex" :size="size">
        <ds-form-item :label="'Name'">
          <ds-input name="name"></ds-input>
        </ds-form-item>

        <ds-form-item :label="'Password'">
          <ds-input name="password"></ds-input>
        </ds-form-item>

        <ds-form-item :label="'Gender'">
          <ds-select :placeholder="placeholder">
            <ds-option :value="0">Male</ds-option>
            <ds-option :value="1">Female</ds-option>
          </ds-select>
        </ds-form-item>

        <ds-form-item :label="'Extra'" v-if="showExtra">
          <ds-input name="extra"></ds-input>
        </ds-form-item>

        <ds-button :category="'primary'" @click="showExtra = !showExtra">
          新增/删除form-item
        </ds-button>

        <ds-button :category="'primary'" @click="switchFlex()">
          变更labelFlex和inputFlex
        </ds-button>
      </ds-form>
    </ds-flex>
  </div>
</template>

<style scoped>
.ds-input {
  width: 200px;
}
</style>
