<script setup>
const props = defineProps({
  direction: {
    type: String,
    default: 'row'
  },
  keys: {
    type: Array,
    default: () => []
  }
});
</script>

<template>
  <div>
    <div v-for="(group, groupIndex) in keys" :key="groupIndex">
      <div v-for="(key, index) in group" :key="index">
        {{ key }}
      </div>
    </div>
  </div>
</template>
