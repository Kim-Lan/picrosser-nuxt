<script setup>
const route = useRoute();
const stopwatch = useStopwatch(route.params.size);
</script>

<template>
  <div class="flex flex-col items-center gap-10 w-full">
    <div class="text-5xl font-bold">
      {{ stopwatch.elapsedTime }}
    </div>
    <div>
      <button type="button" class="btn" @mousedown="stopwatch.start">Start</button>
      <button type="button" class="btn" @mousedown="stopwatch.pause">Pause</button>
      <button type="button" class="btn" @mousedown="stopwatch.resume">Resume</button>
      <button type="button" class="btn" @mousedown="stopwatch.reset">Reset</button>
    </div>
    <Puzzle :width="Number(route.params.size)" :height="Number(route.params.size)" />
  </div>
</template>
