<script setup lang="ts">
const settings = useSettings();
</script>

<template>
  <div class="flex flex-col">
    <div class="font-mono">
      Settings
    </div>
    <v-checkbox
      v-model="settings.fillLine"
      label="Fill line on complete key group"
    ></v-checkbox>
  </div>
</template>

<style>
</style>
