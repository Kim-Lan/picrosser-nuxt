<script setup>
const colorMode = useColorMode();
</script>

<template>
  <div class="btn btn-ghost">
    <label class="swap swap-rotate text-base-200 hover:text-primary">
      <input v-model="colorMode.preference" type="checkbox" true-value="dark" false-value="light" />
      <Icon name="light-mode" size="1.5em" class="swap-on" />
      <Icon name="dark-mode" size="1.5em" class="swap-off" />
    </label>
  </div>
</template>
