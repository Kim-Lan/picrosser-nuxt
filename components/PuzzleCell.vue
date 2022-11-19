<script setup>
const cellState = ref('');

function toggleCellState () {
  if (cellState.value === '') {
    console.log("changing cell state");
    cellState.value = 'filled';
  } else {
    cellState.value = '';
  }
  console.log("current state: " + cellState.value);
}

</script>

<template>
  <div

    @click.stop.prevent="toggleCellState"
  >
    <!-- {{ n }} -->
  </div>
</template>

<style>
</style>
