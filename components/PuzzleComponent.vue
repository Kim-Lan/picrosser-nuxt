<script setup>
const props = defineProps({
  puzzleID: {
    type: String,
    default: ''
  },
  width: {
    type: Number,
    default: 5
  },
  height: {
    type: Number,
    default: 5
  },
  rowKeys: {
    type: Array,
    default: () => []
  },
  colKeys: {
    type: Array,
    default: () => []
  },
  solution: {
    type: Array,
    default: () => []
  }
});

defineExpose({ loadPuzzle })

const puzzle = usePuzzle(props.width, props.height);

const currentID = ref('');
const isSolved = ref(false);
const rowKeys = ref([]);
const colKeys = ref([]);
const solution = ref([]);

function newPuzzleHandler() {
  if (currentID.value === '' || isSolved.value === true) {
    loadPuzzle();
  } else {
    alert('new puzzle?');
  }
}

async function loadPuzzle() {
  const response = await useFetch('http://localhost:3000/api/loadPuzzle',
    { query: { width: props.width, height: props.height } });
  const data = response.data.value;
  puzzle.newPuzzle(data.puzzleID);
  currentID.value = data.puzzleID;
  rowKeys.value = data.rowKeys;
  colKeys.value = data.colKeys;
  solution.value = data.solution;
}

const cellSize = computed(() => {
  return Math.max(Math.min((50 / Math.max(props.height, props.width)), 5), 0.5) + 'vmin'
});

function updateState(index, state) {
  const [row, col] = convertIndexTo2D(index, props.width);
  puzzle.userGrid[row][col] = state;
  printGrid(puzzle.userGrid);
}

</script>

<template>
  <div class="puzzle-container">
    <div class="puzzle-grid">
      <PuzzleCell
        v-for="n in props.width * props.height"
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

    <KeyContainer id="left-keys" :direction="'row'" :keys="rowKeys" />
    <KeyContainer id="right-keys" :direction="'row'" :keys="rowKeys" />
    <KeyContainer id="top-keys" :direction="'col'" :keys="colKeys" />
    <KeyContainer id="bottom-keys" :direction="'col'" :keys="colKeys" />
  </div>
</template>

<style lang="scss">
@import '~/assets/styles/variables.scss';

.puzzle-container {
  display: grid;
  grid-template: auto auto auto / auto auto auto;
  font-size: calc(0.6 * v-bind('cellSize'));
  border-collapse: collapse;
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
