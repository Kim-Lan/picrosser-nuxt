<script setup>
const route = useRoute();
const stopwatch = useStopwatch(route.params.width, route.params.height);

const currentID = ref('');
const isSolved = ref(false);
const rowKeys = ref([]);
const colKeys = ref([]);
const solution = ref([]);

async function newPuzzleHandler() {
  if (currentID.value === '' || isSolved.value === true) {
    const response = await useFetch('http://localhost:3000/api/loadPuzzle?width=' + route.params.width + '&height=' + route.params.height,
      { query: { width: route.params.width, height: route.params.height } });
    const newPuzzle = response.data.value;
    currentID.value = newPuzzle.puzzleID;
    rowKeys.value = newPuzzle.rowKeys;
    colKeys.value = newPuzzle.colKeys;
    solution.value = newPuzzle.solution;
  }
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
    <div>{{ route.params.width }} x {{ route.params.height }}</div>
    <Puzzle
      :puzzle-i-d="currentID"
      :width="Number(route.params.width)"
      :height="Number(route.params.height)"
      :row-keys="rowKeys"
      :col-keys="colKeys"
      :solution="solution"
    />
  </div>
</template>
