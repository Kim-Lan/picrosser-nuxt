<script lang="ts" setup>
const puzzleSize = ref(5);
const sizes = [5, 10, 15, 20, 25];
</script>

<template>
  <div class="flex-col">
    <div class="btn-group">
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
    <Puzzle :width="puzzleSize" :height="puzzleSize" />
  </div>
</template>

<style scoped></style>
