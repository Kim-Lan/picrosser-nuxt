<script setup>
const props = defineProps({
  height: {
    type: Number,
    default: 5
  },
  width: {
    type: Number,
    default: 5
  }
});

defineExpose({ loadPuzzle, resetCells })
onMounted(() => loadPuzzle());

const emit = defineEmits(['solved']);
const puzzle = usePuzzle();

const cells = ref([]);
//const currentID = ref('');
const puzzleID = ref('');
const isSolved = ref(false);
const rowKeys = ref([]);
const colKeys = ref([]);
const solution = ref([]);

const cellSize = computed(() => {
  return Math.max(Math.min((50 / Math.max(props.height, props.width)), 5), 1) + 'vmin'
});

// async function newPuzzleHandler() {
//   if (puzzleID.value === '' || isSolved.value === true) {
//     const id = await loadPuzzle();
//   } else {
//     alert('new puzzle?');
//   }
// }

async function loadPuzzle() {
  const data = await $fetch('/api/loadPuzzle', {
    method: 'GET',
    query: { height: props.height, width: props.width }
  })
  puzzleID.value = data.puzzleID;
  rowKeys.value = data.rowKeys;
  colKeys.value = data.colKeys;
  solution.value = data.solution;
  puzzle.newPuzzle(props.height, props.width, puzzleID.value);
  return puzzleID.value;
}

function updateState(index, state) {
  const [row, col] = convertIndexTo2D(index, props.width);
  puzzle.userGrid[row][col] = state;
  printGrid(puzzle.userGrid);

  if (checkSolution()) {
    puzzle.setSolved(true);
    emit('solved');
  }
}

function resetState() {
  resetCells();
  puzzle.resetState();
}

function resetCells() {
  // cells.value = [];
  for (const cell of cells.value) {
    cell.reset();
  }
}

function checkSolution() {
  for (let i = 0; i < props.height; i++) {
    for (let j = 0; j < props.width; j++) {
      if (puzzle.userGrid[i][j] !== '1' && solution.value[i][j] === '1') {
        return false;
      } else if (puzzle.userGrid[i][j] === '1' && solution.value[i][j] === '0') {
        return false;
      }
    }
  }
  return true;
}

</script>

<template>
  <div class="puzzle-container">
    <div class="puzzle-grid" @contextmenu.prevent>
      <PuzzleCell
        v-for="n in props.width * props.height"
        ref="cells"
        :key="n - 1"
        :index="n - 1"
        :class="{
          'first-row': n <= props.width,
          'first-col': (n - 1) % props.width === 0,
          'five-row': Math.ceil(n / props.height) % 5 === 0,
          'five-col': n % 5 === 0
        }"
        @cell-change="updateState"
      />
    </div>

    <KeyContainer id="left-keys" :direction="'row'" :keys="rowKeys" @contextmenu.prevent />
    <KeyContainer id="right-keys" :direction="'row'" :keys="rowKeys" @contextmenu.prevent />
    <KeyContainer id="top-keys" :direction="'col'" :keys="colKeys" @contextmenu.prevent />
    <KeyContainer id="bottom-keys" :direction="'col'" :keys="colKeys" @contextmenu.prevent />
  </div>
</template>

<style lang="scss">
@import '~/assets/styles/variables.scss';

.puzzle-container {
  display: grid;
  grid-template: auto auto auto / auto auto auto;
  font-size: calc(0.6 * v-bind('cellSize'));
  border-collapse: collapse;
  color: $grid-border;
}

.puzzle-grid {
  grid-area: 2 / 2;
  border-collapse: collapse;

  display: grid;
  grid-template-rows: repeat(v-bind('props.height'), v-bind('cellSize'));
  grid-template-columns: repeat(v-bind('props.width'), v-bind('cellSize'));
  background-color: $grid-border;
  width: fit-content;
  height: fit-content;
}

.puzzle-grid div {
  background-color: white;
  border: $thin-border;
  position: relative;

  &:hover {
    background-color: $grid-hover;
  }
}

.filled::before {
  display: block;
  position: absolute;
  background-color: $grid-border;
  width: 100%;
  height: 100%;
  content: '';
  border: 0.5px solid antiquewhite;
  pointer-events: none;
}

.x::before {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  content: '\2716';
  text-align: center;
  pointer-events: none;
}

div.five-row {
  border-bottom: $thick-border;
}

div.five-col {
  border-right: $thick-border;
}

div.first-row {
  border-top: $thick-border;
}

div.first-col {
  border-left: $thick-border;
}

#top-keys {
  grid-area: 1 / 2;
  border-top: $thicker-border;
}

#bottom-keys {
  grid-area: 3 / 2;
  border-bottom: $thicker-border;
}

#left-keys {
  grid-area: 2 / 1;
  border-left: $thicker-border;
}

#right-keys {
  grid-area: 2 / 3;
  border-right: $thicker-border;
}
</style>
