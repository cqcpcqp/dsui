<script>
export default {
  data() {
    return {};
  },

  mounted() {},
};
</script>

<style scoped></style>

<template>
  <div class="loading-doc">
    <h1>Loading</h1>

    <p>
      用svg来做loading，同时规避在组件库中集成图标库。不像angular component把这个组件
      理解成process，而是单纯理解成正在loading的样式
    </p>

    <fieldset>
      <legend>Select Color:</legend>

      <div>
        <input
          type="radio"
          id="huey"
          name="drone"
          value="huey"
          :checked="direction === 'horizontal'"
          @input="direction = 'horizontal'"
        />
        <label for="huey">horizontal</label>
      </div>

      <div>
        <input
          type="radio"
          id="dewey"
          name="drone"
          value="dewey"
          :checked="direction === 'vertical'"
          @input="direction = 'vertical'"
        />
        <label for="dewey">vertical</label>
      </div>

      {{ direction }}
    </fieldset>

    <ds-loading size="sm" color="primary"></ds-loading>
    <ds-loading size="md" color="success"></ds-loading>
    <ds-loading size="lg" color="primary"></ds-loading>
    <ds-loading style="width: 50px; height: 50px" color="primary"></ds-loading>
  </div>
</template>
