<script setup>
const props = defineProps({
  groupIndex: {
    type: Number,
    default: 0
  },
  keys: {
    type: Array,
    default: []
  },
  cellSize: {
    type: String,
    default: '15px'
  }
});
</script>

<template>
  <div>
    <Key
        v-for="(key, index) in props.keys"
        :key="index"
        class="key-item"
        :group-index="props.groupIndex"
        :key-index="index"
        :key-value="key"
      >
        {{ key }}
      </Key>
  </div>
</template>

<style lang="scss">
</style>
