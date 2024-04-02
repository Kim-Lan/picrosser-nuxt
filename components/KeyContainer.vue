<script setup>
const props = defineProps({
  width: {
    type: Number,
    default: 5
  },
  height: {
    type: Number,
    default: 5
  },
  direction: {
    type: String,
    default: 'row'
  },
  keys: {
    type: Array,
    default: () => []
  },
  cellSize: {
    type: String,
    default: '15px'
  }
});

</script>

<template>
  <div class="key-container" :class="[direction === 'row' ? 'row-keys' : 'col-keys']">
    <KeyGroup
      v-for="(group, groupIndex) in keys"
      :key="groupIndex"
      :group-index="groupIndex"
      :keys="group"
      :cell-size="props.cellSize"
      class="key-group"
      :class="{
        'first-row': direction === 'row' && groupIndex === 0,
        'first-col': direction === 'col' && groupIndex === 0,
        'five-row': direction === 'row' && (groupIndex + 1) % 5 === 0,
        'five-col': direction === 'col' && (groupIndex + 1) % 5 === 0,
        'last-row': direction === 'row' && (groupIndex + 1) % props.height === 0,
        'last-col': direction === 'col' && (groupIndex + 1) % props.width === 0
      }"
    />
  </div>
</template>

<style lang="scss">
@import '~/assets/styles/variables.scss';

.key-container {
  border-collapse: collapse;
  border: $thick-border;
  background-color: white;
  box-sizing: border-box;
}

.row-keys {
  display: grid;
  grid-template-rows: repeat(v-bind('props.height'), v-bind('props.cellSize'));
  height: 100%;

  .key-group {
    display: flex;
    flex-direction: row;
    gap: 6px;
    padding: 0px 4px;
    align-items: center;

    &:not(.last-row) {
      border-bottom: $thin-border;
    }

    &.five-row {
      &:not(.last-row) {
        border-bottom: $thick-border;
      }
    }
  }
}

.col-keys {
  display: grid;
  grid-template-columns: repeat(v-bind('props.width'), v-bind('props.cellSize'));
  width: 100%;

  .key-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 2px 0px;
    align-items: center;

    &:not(.last-col) {
      border-right: $thin-border;
    }

    &.five-col {
      &:not(.last-col) {
        border-right: $thick-border;
      }
    }
  }
}

.key-group {
  flex: 1 1 0px;
  box-sizing: border-box;
  // &.clickable:hover {
  //   background-color: lavenderblush;
  // }
}

.key-item {
  //   &:not(.clickable) {
  //     pointer-events: none;
  //   }
  //
  //   &.clickable:not(.pressed):hover {
  //     background-color: lavenderblush;
  //   }
  //
  //   &.pressed {
  //     color: steelblue lightsteelblue;
  //   }

  text-align: center;
  cursor: default;
}

#top-keys {
  grid-area: 1 / 2;
  border-top: $thick-border;
  border-bottom: 0;

  .key-group {
    justify-content: flex-end;
  }
}

#bottom-keys {
  grid-area: 3 / 2;
  border-bottom: $thick-border;
  border-top: 0;

  .key-group {
    justify-content: flex-start;
  }
}

#left-keys {
  grid-area: 2 / 1;
  border-left: $thick-border;
  border-right: 0;

  .key-group {
    justify-content: flex-end;
  }
}

#right-keys {
  grid-area: 2 / 3;
  border-right: $thick-border;
  border-left: 0;

  .key-group {
    justify-content: flex-start;
  }
}
</style>
