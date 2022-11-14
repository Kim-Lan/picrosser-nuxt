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
  <main class="min-h-screen">
    <nav class="navbar flex flex-row justify-between bg-neutral w-screen py-3 px-7 border-b-2 border-slate-800">
      <div class="antialiased text-2xl text-primary font-black tracking-wide font-sans">Picrosser</div>
      <div>
        <label class="swap swap-rotate text-base-200 hover:text-primary">
          <input type="checkbox" />
          <Icon name="light-mode" size="1.5em" class="swap-on" />
          <Icon name="dark-mode" size="1.5em" class="swap-off" />
        </label>
      </div>
    </nav>

    <div
      class="p-8 min-h-full"
    >
      <NuxtPage />
    </div>
  </main>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Ubuntu&display=swap');
body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  background-color: hsl(var(--b2));
}

.dark-mode body {
  background-color: hsl(var(--n));
  color: white;
}
</style>
