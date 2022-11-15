<script setup>
const sizes = [5, 10, 15, 20, 25];
</script>

<template>
  <main class="min-h-screen">
    <nav class="navbar flex flex-row justify-between bg-neutral w-screen py-3 px-7 border-b-2 border-slate-800">
      <div class="btn btn-ghost normal-case antialiased text-2xl text-primary font-black tracking-wide font-sans hover:text-slate-200">
        <NuxtLink to="/">
          Picrosser
        </NuxtLink>
      </div>
      <div class="btn-group">
        <input
          v-for="(size, index) in sizes"
          :key="index"
          v-model="puzzleSize"
          type="radio"
          name="puzzle-size"
          :data-title="size + 'x' + size"
          :value="size"
          class="btn bg-neutral border-none dark:bg-slate-200 dark:text-neutral dark:hover:bg-slate-300"
        />
      </div>
      <div>5x5</div>
      <DarkModeToggle />
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

.dark body {
  background-color: hsl(var(--n));
  color: white;
}
</style>
