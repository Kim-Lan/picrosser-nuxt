<script lang="ts" setup>
const puzzleSize = ref(5);
const sizes = [5, 10, 15, 20, 25];
</script>

<template>
  <div class="flex flex-col items-center gap-10 w-full">
    <div class="btn-group">
      <input
        v-for="(size, index) in sizes"
        :key="index"
        v-model="puzzleSize"
        type="radio"
        name="puzzle-size"
        :data-title="size + 'x' + size"
        :value="size"
        class="btn bg-neutral border-none dark:bg-slate-200 dark:text-neutral dark:hover:bg-slate-300"
      />
    </div>
    <div class="text-5xl font-bold">
      00:00.000
    </div>
    <div>
      <Puzzle :width="puzzleSize" :height="puzzleSize" />
    </div>
  </div>
</template>

<style scoped></style>
