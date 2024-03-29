<script setup>
const props = defineProps({
  direction: {
    type: String,
    default: 'row'
  },
  keys: {
    type: Array,
    default: () => []
  }
});
</script>

<template>
  <div class="key-container" :class="[direction === 'row' ? 'row-keys' : 'col-keys']">
    <div
      v-for="(group, groupIndex) in keys"
      :key="groupIndex"
      class="key-group"
      :class="{
        'first-row': direction === 'row' && groupIndex === 0,
        'first-col': direction === 'col' && groupIndex === 0,
        'five-row': direction === 'row' && (groupIndex + 1) % 5 === 0,
        'five-col': direction === 'col' && (groupIndex + 1) % 5 === 0
      }"
    >
      <Key
        v-for="(key, index) in group"
        :key="index"
        class="key-item"
        :group-index="groupIndex"
        :key-index="index"
        :key-value="key"
      >
        {{ key }}
      </Key>
    </div>
  </div>
</template>

<style lang="scss">
@import '~/assets/styles/variables.scss';

.key-container {
  border-collapse: collapse;
  border: $thin-border;
  background-color: white;
}

.row-keys {
  display: flex;
  flex-direction: column;
  justify-content: center;

  .key-group {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    padding: 0px 2px;

    &:not(.first-row) {
      border-top: $thin-border;
    }

    .key-item {
      padding: 0px 3px;
      display: flex;
      justify-content: center;
    }
  }
}

.col-keys {
  display: flex;
  flex-direction: row;

  .key-group {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    &:not(.first-col) {
      border-left: $thin-border;
    }

    .key-item {
      padding: 0px;
    }
  }
}

.key-group {
  flex: 1 1 0px;

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
</style>
