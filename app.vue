<script setup>
import { NSwitch } from 'naive-ui'

const colorMode = useColorMode();
</script>

<template>
  <main>
    <header>
      <h1>Picrosser</h1>
      <nav>
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/settings">Settings</NuxtLink>
      </nav>
      <n-switch id="dark-mode-switch" @click="$colorMode.preference=!$colorMode.preference">
        <template #icon>
          <Icon name="dark-mode" />
          <!-- <n-icon :component="DarkModeFilled" /> -->
        </template>
      </n-switch>
    </header>
    <div>
      <NuxtPage />
    </div>
  </main>
</template>

<style>
.dark-mode body {
  background-color: darkgrey;
}

.light-mode body {
  background-color: white;
}

main {
  padding: 0px 20px;
}

header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

#dark-mode-switch {
  justify-self: end;
}
</style>
