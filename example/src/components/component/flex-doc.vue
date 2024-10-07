<script>
import { DsFlex } from 'dsui';

export default {
  components: { DsFlex },
  data() {
    return {
      direction: 'row',
    };
  },

  mounted() {},
};
</script>

<template>
  <div class="flex-doc">
    <h1>Flex</h1>
    <p>倾向于实现flex组件，不做space了。应该没有space能实现，但flex实现不了的场景</p>

    <fieldset>
      <legend>Select a direction:</legend>

      <div>
        <input
          type="radio"
          id="huey"
          name="drone"
          value="huey"
          :checked="direction === 'row'"
          @input="direction = 'row'"
        />
        <label for="huey">horizontal</label>
      </div>

      <div>
        <input
          type="radio"
          id="dewey"
          name="drone"
          value="dewey"
          :checked="direction === 'column'"
          @input="direction = 'column'"
        />
        <label for="dewey">vertical</label>
      </div>

      {{ direction }}
    </fieldset>

    <ds-flex :direction="direction" style="border: 1px solid black; margin-top: 20px">
      <ds-square :size="100" :color="'deeppink'"></ds-square>
      <ds-square :size="100" :color="'deeppink'"></ds-square>
      <ds-square :size="100" :color="'deeppink'"></ds-square>
      <ds-square :size="100" :color="'deeppink'"></ds-square>
    </ds-flex>
  </div>
</template>
