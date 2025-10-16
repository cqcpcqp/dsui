<script setup>
import { ref } from 'vue';
const heads = ref(['id', 'name', 'address']);
const rows = ref([
  { id: 0, name: 'name0', address: 'address0' },
  { id: 1, name: 'name1', address: 'address1' },
  { id: 2, name: 'name2', address: 'address2' },
]);
</script>

<template>
  <div class="table-doc">
    <h1>Table</h1>
    <p>表格</p>

    <ds-table :heads="heads" :rows="rows"></ds-table>
  </div>
</template>
