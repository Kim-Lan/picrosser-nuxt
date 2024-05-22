<script setup>
import { useTheme } from 'vuetify'

const theme = useTheme();
const settings = useSettings();

theme.global.name.value = settings.theme;

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
  settings.toggleTheme();
}
</script>

<template>
  <v-btn aria-label="toggle theme" icon="mdi-theme-light-dark" @click="toggleTheme">
  </v-btn>
  <!-- <div class="btn btn-ghost hover:bg-primary">
    <label class="swap swap-rotate">
      <input v-model="colorMode.preference" type="checkbox" true-value="dark" false-value="light" />
      <Icon name="light-mode" size="1.5em" class="swap-off" />
      <Icon name="dark-mode" size="1.5em" class="swap-on" />
    </label>
  </div> -->
</template>
