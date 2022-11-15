<script setup>
const sizes = [5, 10, 15, 20, 25];

const route = useRoute();

function getPath (size) {
  return '/puzzle/size/' + size;
}
</script>

<template>
  <ul>
    <li
      v-for="(size, index) in sizes"
      :key="index"
      class="btn text-base-200"
      :class="{ selected: $route.params.size == size }"
    >
      <NuxtLink :to="getPath(size)">{{ size }} x {{ size }}</NuxtLink>
    </li>
  </ul>
</template>

<style scoped>
.selected {
  background-color: hsl(var(--p));
}
</style>
