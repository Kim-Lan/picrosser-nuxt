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
</script>

<template>
  <div>
    <slot></slot>
  </div>
</template>

<style lang="scss">

</style>
