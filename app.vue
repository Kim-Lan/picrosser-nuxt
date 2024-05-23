<script setup>
useHead({
  title: 'Picrosser',
  meta: [
    { name: 'description', content: 'A website to play the picross puzzle game online.'}
  ],
  link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
})

const route = useRoute();
const puzzle = usePuzzle();
const drawer = ref(false);

function navigatePlay() {
  if (!route.path.includes('play')) {
    const { height, width } = puzzle.getSize();
    if (height.value != 0 && width.value != 0) {
      navigateTo(`/play/${height.value}x${width.value}`);
    } else {
      navigateTo('/play/5x5');
    }
  }
}

</script>

<template>
  <v-app>
    <NuxtLoadingIndicator color="#0D47A1" />
    <v-app-bar :elevation="0" color="blue-darken-1" class="font-mono" >
      <v-app-bar-title class="font-weight-bold">
        <NuxtLink to="/">
          Picrosser
        </NuxtLink>
      </v-app-bar-title>
      <nav class="max-sm:hidden">
        <v-btn class="mx-2 font-weight-bold" @click="navigatePlay">
          Play
        </v-btn>
      </nav>
      <DarkModeToggle />
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer">
        <!-- <Icon name="menu" size="1.75em" /> -->
        <v-icon>mdi-menu</v-icon>
      </v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      location="right"
      width=""
      temporary
    >
      <NavigationDrawerContents />
    </v-navigation-drawer>

    <v-main class="w-max mx-auto">
      <NuxtPage />
    </v-main>

    <v-footer class="flex flex-col justify-center max-h-16 mt-16">
      <div>
        In development by Kim-Lan
      </div>
      <NuxtLink to="https://github.com/Kim-Lan/picrosser-nuxt">
        <v-btn prepend-icon="mdi-github" size="medium" variant="plain" aria-label="github"></v-btn>
      </NuxtLink>
    </v-footer>
  </v-app>
</template>

<style>
.v-application__wrap {
  max-width: none !important;
}
</style>
