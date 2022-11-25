<script setup>
const props = defineProps({
  index: {
    type: Number,
    default: 0
  }
});

const mouse = useMouse();

const cellState = ref('');
const emit = defineEmits(['cellChange']);

function onPointerDown(event) {
  mouse.onPressed(event);
  if (mouse.mouseState === 0) {
    mouse.filling = (cellState.value !== 'filled');
    toggleState('filled');
  } else if (mouse.mouseState === 2) {
    mouse.filling = (cellState.value !== 'x');
    toggleState('x');
  }

  // event.target.releasePointerCapture(event.pointerId);
}

function onPointerEnter() {
  if (mouse.mouseState === 0) {
    mouse.filling ? setState('filled') : setState('empty');
  } else if (mouse.mouseState === 2) {
    mouse.filling ? setState('x') : setState('empty');
  }
}

function setState(string) {
  const prev = cellState.value;
  cellState.value = string;
  emitCellChange();
}

function toggleState(string) {
  cellState.value === string ? setState('empty') : setState(string);
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
    :class="cellState"
    @pointerdown.prevent="onPointerDown"
    @pointerenter.prevent="onPointerEnter"
    @ondragstart.prevent
  >
    <!-- {{ n }} -->
  </div>
</template>

<style>

</style>
