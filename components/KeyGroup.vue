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

const emit = defineEmits(['keyPressed']);
defineExpose({ pressKey, getGroupIndex });

const keyComponents = ref([]);

function onKeyPressed(keyIndex, isPressed) {
  emit('keyPressed', props.groupIndex, keyIndex, isPressed);
  let keyGroupDone = true;
  for (const key of keyComponents.value) {
    if (!key.isPressed()) {
      keyGroupDone = false;
      if (keyGroupDone) {

      }
    }
  }
  if (keyGroupDone) {

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
