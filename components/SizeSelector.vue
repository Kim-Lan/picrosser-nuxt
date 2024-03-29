<script setup>
// const sizes = [5, 10, 15, 20, 25];
const sizes = ['5x5', '10x10', '15x15', '20x20', '25x25'];

const route = useRoute();

</script>

<template>
  <!-- <ul>
    <li
      v-for="size in sizes"
      :key="size"
      class="btn text-base-200 hover:bg-primary"
      :class="{ selected: Number($route.params.width) === size && Number($route.params.height) === size }"
    >
      <NuxtLink :to="`${size}x${size}`">{{ size }} x {{ size }}</NuxtLink>
    </li>
  </ul> -->
  <!-- <select class="select select-bordered">
    <option
      v-for="size in sizes"
      :key="size"
    >
      {{ size }} x {{ size }}
    </option>
  </select> -->
  <div>
    <v-select
      label="Select Size"
      :items="sizes"
    ></v-select>
    <v-btn>Start New</v-btn>
  </div>
</template>

<style scoped>
div {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 50%;
}
/* .selected {
  background-color: oklch(var(--p));
} */
</style>
