<script setup>
const route = useRoute();
const stopwatch = useStopwatch(route.params.size);
</script>

<template>
  <div class="flex flex-col items-center gap-10 w-full">
    <div class="text-5xl font-bold">
      {{ stopwatch.startTimestamp }}
    </div>
    <Puzzle :width="$route.params.size" :height="$route.params.size" />
  </div>
</template>
