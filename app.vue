<script setup>

</script>

<template>
  <main class="min-h-screen">
    <nav class="navbar flex flex-row flex-wrap justify-between bg-neutral w-screen py-3 px-7 border-b-2 border-slate-800">
      <div class="btn btn-ghost normal-case antialiased text-2xl text-primary font-black tracking-wide font-sans hover:text-slate-200 hover:bg-primary">
        <NuxtLink to="/">
          Picrosser
        </NuxtLink>
      </div>
      <SizeSelector class="flex flex-wrap" />
      <DarkModeToggle class="flex" />
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
