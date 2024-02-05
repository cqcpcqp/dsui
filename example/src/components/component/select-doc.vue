<script xmlns="http://www.w3.org/1999/html">
import { DsSelect, DsFlex, DsOption } from 'dsui';
export default {
  components: { DsSelect, DsFlex, DsOption },
  data() {
    return {
      v: '',
    };
  },

  mounted() {},
};
</script>

<template>
  <div class="input-doc">
    <h1>Select</h1>

    <p>not base on native element 'select', no specific reason, just hard to use</p>
    <p>
      但是希望交互表现上与原生select/option一致。所以会给select的dropdown加蒙层
      （会导致像material一样，在打开dropdown之后所有hover效果都失效，一定要点击一次，关掉蒙层后才能与页面进行交互）。
      更显著的区别是，在打开dropdown之后能否再进行滚动之类的操作。
    </p>

    <ds-flex :direction="'column'">
      <ds-select style="width: 200px">
        <ds-option value="dog">Dog</ds-option>
        <ds-option value="dog">Dog</ds-option>
        <ds-option value="dog">Dog</ds-option>
        <ds-option value="cat">Cat</ds-option>
        <ds-option value="cat">Cat</ds-option>
        <ds-option value="cat">Cat</ds-option>
        <ds-option value="hamster">Hamster</ds-option>
        <ds-option value="hamster">Hamster</ds-option>
        <ds-option value="hamster">Hamster</ds-option>
        <ds-option value="parrot">Parrot</ds-option>
        <ds-option value="parrot">Parrot</ds-option>
        <ds-option value="parrot">Parrot</ds-option>
      </ds-select>

      <select name="pets" id="pet-select">
        <option value="">--Please choose an option--</option>
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
        <option value="hamster">Hamster</option>
        <option value="parrot">Parrot</option>
        <option value="spider">Spider</option>
        <option value="goldfish">Goldfish</option>
      </select>
    </ds-flex>
  </div>
</template>
