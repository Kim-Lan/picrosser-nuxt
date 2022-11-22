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

const cellSize = computed(() => {
  return Math.max(Math.min((80 / Math.max(props.height, props.width)), 5), 1) + 'vmin'
});

function updateState(index, state) {

}

</script>

<template>
  <div class="puzzle-container">
    <div class="puzzle-grid">
      <PuzzleCell
        v-for="n in props.width * props.height"
        :key="n"
        :index="n"
        :class="{ firstRow: n <= props.width,
                  firstCol: (n - 1) % props.width == 0,
                  fiveRow: Math.ceil(n / props.height) % 5 == 0,
                  fiveCol: n % 5 == 0}"
        @cell-change="updateState"
      />
    </div>

    <KeyContainer :direction="'row'" :keys="rowKeys" />
    <KeyContainer :direction="'row'" :keys="rowKeys" />
    <KeyContainer :direction="'col'" :keys="colKeys" />
    <KeyContainer :direction="'col'" :keys="colKeys" />
  </div>
</template>

<style lang="scss">
$grid-bg: #F5F5F4;
$grid-border: #334155;
$grid-hover: bisque;
$thin-border: 0.5px solid $grid-border;
$thick-border: 2px solid $grid-border;

.puzzle-container {
  display: grid;
  grid-template: auto auto auto / auto auto auto;
  gap: 2px;
}

.col-keys {
  grid-area: 1 / 2;
  display: flex;
  flex-direction: row;

  div {
    min-width: v-bind('cellSize');
    min-height: v-bind('cellSize');
    border: $thin-border;
    background-color: $grid-bg;
  }
}

.puzzle-grid {
  grid-area: 2 / 2;

  display: grid;
  grid-template-rows: repeat(v-bind('props.height'), v-bind('cellSize'));
  grid-template-columns: repeat(v-bind('props.width'), v-bind('cellSize'));
  background-color: $grid-border;
  width: fit-content;
  height: fit-content;
  //border-radius: 10%;
}

.puzzle-grid div {
  background-color: white;
  border: $thin-border;
  //border-radius: 10%;
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

div.fiveRow {
  border-bottom: $thick-border;
}

div.fiveCol {
  border-right: $thick-border;
}

div.firstRow {
  border-top: $thick-border;
}

div.firstCol {
  border-left: $thick-border;
}
</style>
