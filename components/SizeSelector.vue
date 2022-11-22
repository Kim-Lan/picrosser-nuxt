<script setup>
const sizes = [5, 10, 15, 20, 25];

const route = useRoute();

</script>

<template>
  <ul>
    <li
      v-for="size in sizes"
      :key="size"
      class="btn text-base-200 hover:bg-primary"
      :class="{ selected: Number($route.params.width) === size && Number($route.params.height) === size }"
    >
      <NuxtLink :to="size + 'x' + size">{{ size }} x {{ size }}</NuxtLink>
    </li>
  </ul>
</template>

<style>
.selected {
  background-color: hsl(var(--p));
}
</style>
