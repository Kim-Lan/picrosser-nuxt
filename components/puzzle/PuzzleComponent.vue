<script setup>
const props = defineProps({
  height: {
    type: Number,
    default: 5,
  },
  width: {
    type: Number,
    default: 5,
  },
});

onMounted(() => {
  document.addEventListener('keydown', onKeyboardDown);
});


defineExpose({ getNewPuzzle, getPuzzleById, recordAttempt, setPuzzle, reset, checkErrors });

const emit = defineEmits(['solved']);
const puzzle = usePuzzle();

const cells = ref([]);
const leftKeys = ref(null);
const rightKeys = ref(null);
const topKeys = ref(null);
const bottomKeys = ref(null);
const puzzleId = ref('');
const isSolved = ref(false);
const rowKeys = ref([]);
const colKeys = ref([]);
const solution = ref([]);
let actionHistory = new ActionList();

provide('actionHistory', actionHistory);

const cellSizeString = computed(() => {
  if (props.width === 5) {
    return 25 + 'px';
  } else if (props.width === 10) {
    return 22 + 'px';
  } else if (props.width === 15) {
    return 20 + 'px';
  } else if (props.width === 20) {
    return 18 + 'px';
  }
  return 16 + 'px';
});

const fontSizeString = computed(() => {
  if (props.width === 5) {
    return 14 + 'pt';
  } else if (props.width === 10) {
    return 13 + 'pt';
  } else if (props.width === 15) {
    return 12 + 'pt';
  } else if (props.width === 20) {
    return 11 + 'pt';
  }
  return 11 + 'pt';
});

function setPuzzle(data) {
  puzzleId.value = data.puzzleId;
  rowKeys.value = data.rowKeys;
  colKeys.value = data.colKeys;
  solution.value = data.solution;
  actionHistory = new ActionList();
  puzzle.newPuzzle(props.height, props.width, puzzleId.value);
  isSolved.value = false;
}

async function getNewPuzzle() {
  const data = await $fetch('/api/puzzle/getNewPuzzle', {
    method: 'GET',
    query: { height: props.height, width: props.width,  }
  });
  // console.log(data);
  setPuzzle(data);
  return puzzleId.value;
}

async function getPuzzleById(id) {
  const { data } = await useFetch('/api/puzzle/getPuzzleById', {
    method: 'GET',
    query: { height: props.height, width: props.width, id },
  });
  // console.log(data.value);
  setPuzzle(data.value);
  return puzzleId.value;
}

async function recordAttempt(startTimestamp, endTimestamp) {
  const { data: authData } = useAuth();
  if (authData) {
    try {
      const data = await $fetch('/api/puzzle/recordAttempt', {
        method: 'POST',
        body: {
          puzzle: {
            id: puzzleId.value,
            height: props.height,
            width: props.width,
            rowKeys: rowKeys.value,
            colKeys: colKeys.value,
            solution: solution.value,
          },
          userId: authData.value.user._id,
          startTimestamp: startTimestamp,
          endTimestamp: endTimestamp,
        },
      });
      if (data.value) {
        console.log('recorded attempt');
      }
    } catch (error) {
      console.log(error);
    }
  }
}

function updateState(index, state, prev) {
  actionHistory.push('cell', index, -1, prev, state);

  const [row, col] = convertIndexTo2D(index, props.width);
  puzzle.userGrid[row][col] = state;
  printGrid(puzzle.userGrid);

  if (!isSolved.value && checkSolution()) {
    puzzle.setSolved(true);
    isSolved.value = true;
    emit('solved');
  }
}

function reset() {
  resetCells();
  resetKeys();
  puzzle.resetState();
}

function resetCells() {
  for (const cell of cells.value) {
    cell.reset();
  }
}

function resetKeys() {
  leftKeys.value.reset();
  rightKeys.value.reset();
  topKeys.value.reset();
  bottomKeys.value.reset();
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

function checkErrors() {
  let errors = 0;
  for (let i = 0; i < props.height; i++) {
    for (let j = 0; j < props.width; j++) {
      if (puzzle.userGrid[i][j] === '-1' && solution.value[i][j] === '1') {
        errors++;
      } else if (puzzle.userGrid[i][j] === '1' && solution.value[i][j] === '0') {
        errors++;
      }
    }
  }
  return errors;
}

function onKeyPressed(direction, groupIndex, keyIndex, isPressed) {
  // console.log(`puzzle detected key press: ${direction} ${groupIndex} ${keyIndex}`);
  if (direction === 'row') {
    actionHistory.push('row-key', groupIndex, keyIndex, !isPressed, isPressed);
  } else {
    actionHistory.push('col-key', groupIndex, keyIndex, !isPressed, isPressed);
  }
  setKey(direction, groupIndex, keyIndex, isPressed);
}

function onKeyGroupDone(direction, groupIndex) {
  if (direction === 'row') {
    console.log(`filling row ${groupIndex}`)
    for (let c = 0; c < props.width; c++) {
      if (puzzle.userGrid[groupIndex][c] === '0') {
        puzzle.userGrid[groupIndex][c] = '-1';
        const index = convert2DToIndex(groupIndex, c, props.width);
        cells.value[index].setState('-1');
      }
    }
  } else {
    console.log(`filling col ${groupIndex}`)
    for (let r = 0; r < props.height; r++) {
      if (puzzle.userGrid[r][groupIndex] === '0') {
        puzzle.userGrid[r][groupIndex] = '-1';
        const index = convert2DToIndex(r, groupIndex, props.width);
        cells.value[index].setState('-1');
      }
    }
  }
}

function setCell(index, newState) {
  console.log(`setting cell index ${index} to ${newState}`);
  const [rowIndex, colIndex] = convertIndexTo2D(index, props.width);
  puzzle.userGrid[rowIndex][colIndex] = newState;
  cells.value[index].setStateSilent(newState);
  printGrid(puzzle.userGrid);
}

function setKey(direction, groupIndex, keyIndex, isPressed) {
  if (direction === 'row') {
    leftKeys.value.pressKey(groupIndex, keyIndex, isPressed);
    rightKeys.value.pressKey(groupIndex, keyIndex, isPressed);
  } else {
    topKeys.value.pressKey(groupIndex, keyIndex, isPressed);
    bottomKeys.value.pressKey(groupIndex, keyIndex, isPressed);
  }
}

function applyAction(action) {
  if (!action) return;

  if (action.isCell()) {
    // console.log("applying cell action: " + action.getIndexA() + " = " + action.getNewValue());
    setCell(action.getIndexA(), action.getNewValue());
  } else {
    const tag = action.getTag().slice(0,3);
    setKey(tag, action.getIndexA(), action.getIndexB(), action.getNewValue());
  }
}

function applyInverseAction(action) {
  if (action.isCell()) {
    // console.log(`applying inverse cell action: ${action.getIndexA()}: ${action.getPrevValue()} => ${action.getNewValue()}`);
    setCell(action.getIndexA(), action.getPrevValue());
  } else {
    const tag = action.getTag().slice(0,3);
    setKey(tag, action.getIndexA(), action.getIndexB(), action.getPrevValue());
  }
}

function onKeyboardDown(e) {
  if (e.key == 'z' || e.key == 'Z') {
    if (e.ctrlKey) {
      if (e.shiftKey) {
        // console.log('ctrl shift z pressed');
        const next = actionHistory.redo();
        if (next) {
          // console.log('redoing');
          applyAction(next);
        }
      } else {
        // console.log('ctrl z pressed');
        const action = actionHistory.undo();
        if (action) {
          applyInverseAction(action);
        } 
      }
    }
  }
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
    <KeyContainer id="left-keys" ref="leftKeys" :direction="'row'" :keys="rowKeys" :width="props.width" :height="props.height" :cell-size="cellSizeString" @key-pressed="onKeyPressed" @key-group-done="onKeyGroupDone" @contextmenu.prevent />
    <KeyContainer id="right-keys" ref="rightKeys" :direction="'row'" :keys="rowKeys" :width="props.width" :height="props.height" :cell-size="cellSizeString" @key-pressed="onKeyPressed" @key-group-done="onKeyGroupDone" @contextmenu.prevent />
    <KeyContainer id="top-keys" ref="topKeys" :direction="'col'" :keys="colKeys" :width="props.width" :height="props.height" :cell-size="cellSizeString" @key-pressed="onKeyPressed" @key-group-done="onKeyGroupDone" @contextmenu.prevent />
    <KeyContainer id="bottom-keys" ref="bottomKeys" :direction="'col'" :keys="colKeys" :width="props.width" :height="props.height" :cell-size="cellSizeString" @key-pressed="onKeyPressed" @key-group-done="onKeyGroupDone" @contextmenu.prevent />
  </div>
</template>

<style lang="scss">
@import '~/assets/styles/variables.scss';

.puzzle-container {
  box-sizing: border-box;
  display: grid;
  grid-template: auto auto auto / auto auto auto;
  line-height: calc(v-bind('cellSizeString') - 2px);
  font-size: v-bind('fontSizeString');
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

.v-theme--dark {
  .puzzle-grid {
    div {
      background-color: antiquewhite;
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

.v-theme--dark {
  .filled::before {
    border: 1px solid antiquewhite;
  }
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
