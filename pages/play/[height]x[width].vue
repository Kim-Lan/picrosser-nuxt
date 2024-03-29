<script lang="ts" setup>
const route = useRoute();
const height = route.params.height;
const width = route.params.width;
const sizes = ['5x5', '10x10', '15x15', '20x20', '25x25'];

const stopwatch = useStopwatch();

const puzzleComponent = ref(null);
const statusMessage = ref('Keep going!');

async function newPuzzleHandler() {
  const newPuzzleID = await puzzleComponent.value.loadPuzzle();
  puzzleComponent.value.resetCells();
  console.log("new puzzle id " + newPuzzleID);
  navigateTo(route.path + '?id=' + newPuzzleID);
  statusMessage.value = 'Keep going!';
  stopwatch.start();
}

function solved() {
  stopwatch.stop();
  statusMessage.value = 'SOLVED!!';
}
</script>

<template>
  <div class="flex flex-col items-center gap-10 my-10 w-full">
    <div class="flex flex-col items-center">
      <v-select
        class="w-60"
        :items="sizes"
        density="compact"
        label="Select Size"
      ></v-select>
      <div class="flex flex-row items-center gap-5">

        <v-btn @click="newPuzzleHandler">Start New</v-btn>
        <v-btn>Check</v-btn>
        <v-btn>Restart</v-btn>
      </div>
    </div>
    <div class="text-5xl font-bold">
      {{ stopwatch.elapsedTime }}
    </div>
    <div>
      {{ statusMessage }}
    </div>
    <PuzzleComponent
      ref="puzzleComponent"
      :height="Number(height)"
      :width="Number(width)"
      @solved="solved"
    />
  </div>
</template>

<style scoped></style>
