<script setup>
import { NSwitch } from 'naive-ui'
</script>

<template>
  <main>
    <header>
      <h1>Picrosser</h1>
      <nav>
        <NuxtLink to="/">Home</NuxtLink>
      </nav>
      <n-switch id="dark-mode-switch">
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
