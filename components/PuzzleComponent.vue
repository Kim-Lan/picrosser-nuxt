<script setup>
const props = defineProps({
  height: {
    type: Number,
    default: 5
  },
  width: {
    type: Number,
    default: 5
  },
  cellSize: {
    type: Number,
    default: 15
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
  // return Math.max(Math.min((50 / Math.max(props.height, props.width)), 5), 1) + 'vmin'
  if (props.width === 5) {
    return 25;
  } else if (props.width === 10) {
    return 20;
  } else if (props.width === 15) {
    return 20;
  } else if (props.width === 20) {
    return 15;
  } else if (props.width === 25) {
    return 15;
  }
});
const cellSizeString = computed(() => {
  if (props.width === 5) {
    return 25 + 'px';
  } else if (props.width === 10) {
    return 22 + 'px';
  } else if (props.width === 15) {
    return 20 + 'px';
  } else if (props.width === 20) {
    return 18 + 'px';
  } else if (props.width === 25) {
    return 15 + 'px';
  }
});
// const cellSizeString = computed(() => {
//   return 15 + 'px'
// });
// const cellSizeString = computed(() => {
//   return 2.5 + 'vmin'
// });

const gridWidth = computed(() => {
  return ((props.width * (props.cellSize)) + 2)+ 'px'
});
const gridHeight = computed(() => {
  return ((props.height * (props.cellSize)) + 2) + 'px'
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
          'five-col': n % 5 === 0,
          'last-row': n > (props.height * props.width) - props.width,
          'last-col': n % props.width === 0
        }"
        @cell-change="updateState"
      />
    </div>
    <KeyContainer id="left-keys" :direction="'row'" :keys="rowKeys" :width="props.width" :height="props.height" :cell-size="cellSizeString" @contextmenu.prevent />
    <KeyContainer id="right-keys" :direction="'row'" :keys="rowKeys" :width="props.width" :height="props.height" :cell-size="cellSizeString" @contextmenu.prevent />
    <KeyContainer id="top-keys" :direction="'col'" :keys="colKeys" :width="props.width" :height="props.height" :cell-size="cellSizeString" @contextmenu.prevent />
    <KeyContainer id="bottom-keys" :direction="'col'" :keys="colKeys" :width="props.width" :height="props.height" :cell-size="cellSizeString" @contextmenu.prevent />
  </div>
</template>

<style lang="scss">
@import '~/assets/styles/variables.scss';

.puzzle-container {
  box-sizing: border-box;
  display: grid;
  grid-template: auto auto auto / auto auto auto;
  line-height: calc(v-bind('cellSizeString') - 2px);
  font-size: 10pt;
  border-collapse: collapse;
  color: $grid-border;
  // gap: 1px;
}

.puzzle-grid {
  box-sizing: border-box;
  grid-area: 2 / 2;
  border-collapse: collapse;
  background-color: $grid-border;

  border: $thick-border;

  display: grid;
  grid-template-rows: repeat(v-bind('props.height'), v-bind('cellSizeString'));
  grid-template-columns: repeat(v-bind('props.width'), v-bind('cellSizeString'));

  div {
    box-sizing: border-box;
    background-color: white;
    position: relative;

    &:not(.last-row) {
      border-bottom: $thin-border;
    }

    &:not(.last-col) {
      border-right: $thin-border;
    }

    &:hover {
      background-color: $grid-hover;
    }
  }
}

.filled::before {
  box-sizing: border-box;
  display: block;
  position: absolute;
  background-color: $grid-border;
  width: 100%;
  height: 100%;
  content: '';
  border: 1px solid white;
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
  &:not(.last-row) {
    border-bottom: $thick-border;
  }
}

div.five-col {
  &:not(.last-col) {
    border-right: $thick-border;
  }
}

</style>
