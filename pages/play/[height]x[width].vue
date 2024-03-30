<script lang="ts" setup>
const route = useRoute();
const height = route.params.height;
const width = route.params.width;
// const sizes = ['5x5', '10x10', '15x15', '20x20', '25x25'];
const sizes = [
  {
    value: 5,
    label: '5x5'
  },
  {
    value: 10,
    label: '10x10'
  },
  {
    value: 15,
    label: '15x15'
  },
  {
    value: 20,
    label: '20x20'
  },
  {
    value: 25,
    label: '25x25'
  }
];
const selectedSize = ref({
  value: height,
  label: `${height}x${height}`
});
const stopwatch = useStopwatch();
stopwatch.reset();

const puzzleComponent = ref(null);
const statusMessage = ref('Keep going!');

async function newPuzzleHandler() {
  if (selectedSize.value != height) {
    navigateTo(`/play/${selectedSize.value}x${selectedSize.value}`);
  }
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
      <!-- <select>
        <option value="5">5x5</option>
        <option value="10">10x10</option>
        <option value="15">15x15</option>
        <option value="20">20x20</option>
        <option value="25">25x25</option>
      </select> -->
      <v-select
        v-model="selectedSize"
        :items="sizes"
        density="compact"
        label="Select Size"
        item-title="label"
        item-value="value"
        class="w-60"
      ></v-select>
      <div class="flex flex-row items-center gap-5">

        <v-btn @click="newPuzzleHandler">Start New</v-btn>
        <v-btn>Check</v-btn>
        <v-btn>Restart</v-btn>
        <v-btn></v-btn>
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
