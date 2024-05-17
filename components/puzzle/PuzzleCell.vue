<script setup>
const props = defineProps({
  index: {
    type: Number,
    default: 0
  }
  // rowIndex: {
  //   type: Number,
  //   default: 0
  // },
  // colIndex: {
  //   type: Number,
  //   default: 0
  // }
});

defineExpose({ reset });

const mouse = useMouse();

const cellState = ref('');
const emit = defineEmits(['cellChange']);

const top = computed(() => {
  return ((props.rowIndex * 16) + 1) + 'px'
});
const left = computed(() => {
  return ((props.colIndex * 16) + 1) + 'px'
});

function onPointerDown(event) {
  mouse.onPressed(event);
  if (mouse.mouseState === 0) {
    mouse.filling = (cellState.value !== '1');
    toggleState('1');
  } else if (mouse.mouseState === 2) {
    mouse.filling = (cellState.value !== '-1');
    toggleState('-1');
  }

  // event.target.releasePointerCapture(event.pointerId);
}

function onPointerEnter() {
  if (mouse.mouseState === 0) {
    mouse.filling ? setState('1') : setState('0');
  } else if (mouse.mouseState === 2) {
    mouse.filling ? setState('-1') : setState('0');
  }
}

function setState(string) {
  const prev = cellState.value;
  cellState.value = string;
  emitCellChange();
}

function toggleState(string) {
  cellState.value === string ? setState('0') : setState(string);
}

function reset() {
  cellState.value = '0';
}

function emitCellChange() {
  emit('cellChange',
    props.index,
    cellState.value
  );
}

</script>

<template>
  <div
    :class="{ 'filled': cellState === '1', 'empty': cellState === '0', 'x': cellState === '-1' }"
    @pointerdown.prevent="onPointerDown"
    @pointerenter.prevent="onPointerEnter"
    @ondragstart.prevent
  >
    <!-- {{ n }} -->
  </div>
</template>

<style>
</style>
