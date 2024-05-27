<script setup>
useHead({
  title: 'Picrosser - Play the puzzle game Picross online!',
  meta: [
    { name: 'description', content: 'A website to play the puzzle game Picross, also known as nonograms, online in your browser.'}
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

    <v-main>
      <NuxtPage />
    </v-main>

    <v-footer class="box-content flex flex-col max-h-16 mt-16">
      <div>
        In development by Kim-Lan
      </div>
      <div class="flex flex-row align-center">
        <NuxtLink to="https://github.com/Kim-Lan/picrosser-nuxt" target="_blank">
          <v-btn icon="mdi-github" size="medium" variant="plain" aria-label="github button"></v-btn>
        </NuxtLink>
        <NuxtLink to="https://ko-fi.com/kimlan" target="_blank">
          <v-btn size="medium" variant="plain" aria-label="ko-fi button">
            <img src="https://storage.ko-fi.com/cdn/brandasset/kofi_s_logo_nolabel.png" alt="ko-fi" width="40px" height="40px" />
          </v-btn>
        </NuxtLink>
      </div>
    </v-footer>
  </v-app>
</template>

<style>
.v-application__wrap {
  max-width: none !important;
}
</style>
