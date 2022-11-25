<script setup>
const route = useRoute();
const width = route.params.height;
const height = route.params.width;
const stopwatch = useStopwatch(width, height);
const puzzle = ref(null);

function newPuzzleHandler() {
  puzzle.value.loadPuzzle();
}
</script>

<template>
  <div class="flex flex-col items-center gap-10 w-full">
    <div class="text-5xl font-bold">
      {{ stopwatch.elapsedTime }}
    </div>
    <div>
      <button type="button" class="btn" @mousedown="newPuzzleHandler">New Puzzle</button>
      <button type="button" class="btn" @mousedown="stopwatch.pause">Pause</button>
      <button type="button" class="btn" @mousedown="stopwatch.resume">Resume</button>
      <button type="button" class="btn" @mousedown="stopwatch.reset">Reset</button>
    </div>
    <div>{{ width }} x {{ height }}</div>
    <PuzzleComponent
      ref="puzzle"
      :width="Number(width)"
      :height="Number(height)"
    />
  </div>
</template>
