<script setup>
const props = defineProps({
  groupIndex: {
    type: Number,
    default: 0
  },
  keyIndex: {
    type: Number,
    default: 0
  },
  keyValue: {
    type: Number,
    default: 0
  },
  keyState: {
    type: String,
    default: ''
  }
});

defineExpose({ isPressed, setPressed, getKeyIndex });
const emit = defineEmits(['pressed']);

const pressed=ref(false);


function onPointerDown(event) {
  pressed.value = !pressed.value;
  emit('pressed', props.keyIndex, pressed.value);
}

function isPressed() {
  return pressed.value;
}

function setPressed(value) {
  pressed.value = value;
}

function getKeyIndex() {
  return props.keyIndex;
}

</script>

<template>
  <div
    :class="{ pressed: pressed }"
    @pointerdown.prevent="onPointerDown"
  >
    <slot></slot>
  </div>
</template>

<style lang="scss">

</style>
