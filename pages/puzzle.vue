<script setup>
const route = useRoute();
const stopwatch = useStopwatch(route.params.width);
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
    <div>{{ route.params.width }} x {{ route.params.height }}</div>
    //<Puzzle :width="Number(route.params.width)" :height="Number(route.params.height)" />
  </div>
</template>
