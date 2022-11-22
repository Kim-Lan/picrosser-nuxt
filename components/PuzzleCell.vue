<script setup>
const props = defineProps({
  index: {
    type: Number,
    default: 0
  }
});

const cellState = ref('');
const emit = defineEmits(['cellChange']);

function toggleCellState () {
  if (cellState.value === '') {
    console.log("changing cell state");
    cellState.value = 'filled';
  } else {
    cellState.value = '';
  }
  console.log("current state: " + cellState.value);
  emit('cellChange', props.index, cellState.value);
}

</script>

<template>
  <div
    :class="cellState"
    @pointerdown.prevent="toggleCellState"
  >
    <!-- {{ n }} -->
  </div>
</template>

<style>
</style>
