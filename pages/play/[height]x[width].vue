<script lang="ts" setup>
const route = useRoute();
const router = useRouter();
const height = route.params.height;
const width = route.params.width;

const loadingIndicator = useLoadingIndicator();

const { data: authData } = useAuth();
// const sizes = [
//   {
//     value: 5,
//     label: '5x5'
//   },
//   {
//     value: 10,
//     label: '10x10'
//   },
//   {
//     value: 15,
//     label: '15x15'
//   },
//   {
//     value: 20,
//     label: '20x20'
//   },
//   {
//     value: 25,
//     label: '25x25'
//   }
// ];
const selectedSize = ref(height);
const stopwatch = useStopwatch();
stopwatch.reset();

const puzzleComponent = ref(null);
const statusMessage = ref('Keep going!');

// onMounted(() => newPuzzleHandler());

async function newPuzzleHandler() {
  selectedSize.value = height;
  loadingIndicator.start();
  const newPuzzleId = await puzzleComponent.value.getNewPuzzle();
  loadingIndicator.finish();
  puzzleComponent.value.reset();
  console.log("new puzzle id " + newPuzzleId);
  // navigateTo(route.path + '?id=' + newPuzzleId);
  router.push(`${route.path}?id=${newPuzzleId}`);
  statusMessage.value = 'Keep going!';
  stopwatch.start();
}

function changeSize() {
  if (selectedSize.value != height) {
    navigateTo(`/play/${selectedSize.value}x${selectedSize.value}`);
  }
}

async function solved() {
  stopwatch.stop();
  statusMessage.value = 'SOLVED!!';

  puzzleComponent.value.recordAttempt(stopwatch.startTimestamp, stopwatch.endTimestamp);
}
</script>

<template>
  <v-container class="flex flex-col items-center gap-5 my-5 w-full font-sans">
    <VerifyEmailAlert />
    <div class="flex flex-col items-center gap-5">
      <div class="flex flex-row align-end gap-5">
        <div class="flex flex-col items-center align-start">
          <div class="text-sm">
            Puzzle Size
          </div>
          <div class="select flex flex-col text-lg">
            <select v-model="selectedSize">
              <option value="5">5x5</option>
              <option value="10">10x10</option>
              <option value="15">15x15</option>
              <option value="20">20x20</option>
              <option value="25">25x25</option>
            </select>
          </div>
        </div>
        <v-btn size="small" elevation="1" color="blue-darken-1" class="font-weight-bold" @click="changeSize">Change Size</v-btn>
      </div>


      <!-- <v-select
        v-model="selectedSize"
        :items="sizes"
        density="compact"
        label="Puzzle Size"
        item-title="label"
        item-value="value"
        class="w-60"
      ></v-select> -->
      <div class="flex flex-row items-center gap-5">
        <v-btn size="small" elevation="1" color="blue-darken-1" class="font-weight-bold" @click="newPuzzleHandler">Start New</v-btn>
        <v-btn size="small" elevation="1" color="blue-darken-1" class="font-weight-bold">Check</v-btn>
        <v-btn size="small" elevation="1" color="blue-darken-1" class="font-weight-bold">Restart</v-btn>
        <v-btn size="small" elevation="1" color="blue-darken-1" class="font-weight-bold">End</v-btn>
      </div>
    </div>
    <div v-if="route.query.id" class="text-5xl font-bold font-mono">
      {{ stopwatch.elapsedTime }}
    </div>
    <div v-if="route.query.id">
      {{ statusMessage }}
    </div>
    <PuzzleComponent
      ref="puzzleComponent"
      :height="Number(height)"
      :width="Number(width)"
      @solved="solved"
    />
  </v-container>
</template>

<style lang="scss">
.select {
  position: relative;
  width: 100px;
  height: 100%;
  border: 1px lightgrey solid;
  border-radius: 4px;
  cursor: pointer;

  select {
    appearance: none;
    -webkit-appearance: none;
    width: 100%;
    height: 100%;
    padding: 4px 10px;
  }
}

.select::after {
  position: absolute;
  right: 8px;
  top: 45%;
  content: "";
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid black;
  pointer-events: none;
}

.v-theme--dark {
  .select::after {
    border-top: 5px solid white;
  }

  option {
    color: black;
  }
}
</style>
