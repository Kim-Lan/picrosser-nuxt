<script setup>
const stopwatch = useStopwatch();
</script>

<template>
  <div class="text-5xl font-bold">
    {{ stopwatch.elapsedTime }}
  </div>
  <v-btn @click=stopwatch.start>Start</v-btn>
  <v-btn @click=stopwatch.stop>Stop</v-btn>
  <v-btn @click=stopwatch.reset>Reset</v-btn>
</template>
