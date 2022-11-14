<script lang="ts" setup>
const puzzleSize = ref(5);
const sizes = [5, 10, 15, 20, 25];
</script>

<template>
  <div class="flex flex-col items-center gap-10 w-full">
    <div class="btn-group flex-1">
      <input
        v-for="(size, index) in sizes"
        :key="index"
        v-model="puzzleSize"
        type="radio"
        name="puzzle-size"
        :data-title="size + 'x' + size"
        :value="size"
        class="btn"
      />
    </div>
    <div class="flex-1">
      <Puzzle :width="puzzleSize" :height="puzzleSize" />
    </div>
  </div>
</template>

<style scoped></style>
