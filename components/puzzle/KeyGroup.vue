<script setup>
const props = defineProps({
  direction: {
    type: String,
    default: 'row'
  },
  groupIndex: {
    type: Number,
    default: 0
  },
  keys: {
    type: Array,
    default: []
  },
  cellSize: {
    type: String,
    default: '15px'
  }
});

const settings = useSettings();

const emit = defineEmits(['keyPressed', 'keyGroupDone']);
defineExpose({ pressKey, getGroupIndex, reset });

const keyComponents = ref([]);

function onKeyPressed(keyIndex, isPressed) {
  emit('keyPressed', props.groupIndex, keyIndex, isPressed);

  if (settings.fillLine) {
    let keyGroupDone = true;
    for (const key of keyComponents.value) {
      if (!key.isPressed()) {
        keyGroupDone = false;
      }
    }
    if (keyGroupDone) {
      emit('keyGroupDone', props.groupIndex);
    }
  }
}

function pressKey(keyIndex, isPressed) {
  for (const key of keyComponents.value) {
    if (key.getKeyIndex() === keyIndex) {
      key.setPressed(isPressed);
    }
  }
}

function getGroupIndex() {
  return props.groupIndex;
}

function reset() {
  for (const key of keyComponents.value) {
    key.setPressed(false);
  }
}


</script>

<template>
  <div>
    <Key
      v-for="(key, index) in props.keys"
      ref="keyComponents"
      :key="index"
      class="key-item"
      :group-index="props.groupIndex"
      :key-index="index"
      :key-value="key"
      @pressed="onKeyPressed"
    >
      {{ key }}
    </Key>
  </div>
</template>

<style lang="scss">
// .col-keys {
//   .key-group {
//     display: grid;
//     grid-template-rows: repeat(v-bind('props.keys.length'), calc(v-bind('props.cellSize')));
//   }
// }
// 
// .row-keys {
//   .key-group {
//     display: grid;
//     grid-template-columns: repeat(v-bind('props.keys.length'), calc(v-bind('props.cellSize')));
//   }
// }
</style>
