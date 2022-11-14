<script setup>
const colorMode = useColorMode();
const buttonColor = computed(() => {
  if (colorMode.preference === 'light') {
    return "#262626";
  } else {
    return "#e6f2ff";
  }
});

function toggleColorMode () {
  if (colorMode.preference === 'light') {
    colorMode.preference = 'dark';
    buttonColor.value = "#e6f2ff";
  } else {
    colorMode.preference = 'light';
    buttonColor.value = "#262626";
  }
};
</script>

<template>
  <main>
    <header>
      <nav>
        <NuxtLink to="/"><h1>Picrosser</h1></NuxtLink>
      </nav>

      <va-button :color="buttonColor" @click="toggleColorMode">
        <Icon name="carbon:brightness-contrast" style="margin-right: 5px" />
        Toggle Theme
      </va-button>
    </header>

    <div>
      <NuxtPage />
    </div>
  </main>
</template>

<style>
body {
  background-color: #e6f2ff;
  color: #262626;
}

.dark-mode body {
  background-color: #262626;
  color: white;
}

main {
  padding: 20px;
}

header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>
