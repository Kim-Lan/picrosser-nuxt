<script setup>

const props = defineProps({
  width: {
    type: Number,
    default: 5
  },
  height: {
    type: Number,
    default: 5
  }
});

const cellSize = computed(() => {
  return Math.min((60 / Math.max(props.height, props.width)), 5) + 'vmin'
});
</script>

<template>
  <div class="puzzle-container">
    <div class="puzzle-grid">
      <div
        v-for="n in props.width * props.height"
        :key="n"
        :class="{ firstRow: n <= props.width,
                  firstCol: (n - 1) % props.width == 0,
                  fiveRow: Math.ceil(n / props.height) % 5 == 0,
                  fiveCol: n % 5 == 0 }"
      >
        <!-- {{ n }} -->
      </div>
    </div>

    <div class="col-keys">
      <div v-for="n in props.width" :key="n">
      </div>
    </div>

    <!-- <KeyContainer
      v-for="obj in keyNames"
      :key="obj.name"
      :name="obj.name"
      :direction="obj.direction"
    >
      <div
        v-for="n in fiveGroupDimension"
        :key="n"
        class="five-key-group"
      >
        <KeyGroup
          v-for="k in 5"
          :key="k"
          ref="keyGroups"
          :direction="obj.direction"
          :group-i-d="5 * (n - 1) + k - 1"
        />
      </div>
    </KeyContainer> -->
  </div>
</template>

<style scoped lang="scss">
$grid-bg: white;
$grid-border: #1e293b;
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

  &:hover {
    background-color: $grid-hover;
  }
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
