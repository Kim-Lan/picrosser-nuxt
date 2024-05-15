<script setup>
const drawer = ref(false);

const { data: authData, signOut } = useAuth();

const puzzle = usePuzzle();

function navigatePlay() {
  const { height, width } = puzzle.getSize();
  if (height.value != 0 && width.value != 0) {
    navigateTo(`/play/${height.value}x${width.value}`);
  } else {
    navigateTo('/play/5x5');
  }
}

async function onLogout() {
  try {
    await signOut({
      redirect: false,
    });
  } catch(e) {
    console.log(e);
  } finally {
    console.log('Signed out');
  }
}


</script>

<template>
  <v-app>
    <v-app-bar :elevation="0" color="blue-darken-1" class="font-mono" style="position: relative;">
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
        <Icon name="menu" size="1.75em" />
      </v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      location="right"
      temporary
    >
      <div v-if="authData">Logged in as {{ authData?.user?.username }}</div>
      <!-- <Settings /> -->
      <v-btn v-if="!authData"><NuxtLink to="/login">Login</NuxtLink></v-btn>
      <v-btn v-if="authData" @click="onLogout">Logout</v-btn>
    </v-navigation-drawer>
    <v-main style="--v-layout-top: 0px;" class="w-full">
      <NuxtPage />
    </v-main>
  </v-app>

  <!-- <main class="min-h-screen font-mono">
    <nav class="navbar flex flex-row flex-wrap justify-between bg-slate-800 w-screen py-3 px-7 text-stone-100">
      <div class="btn btn-ghost normal-case antialiased text-2xl tracking-wide hover:text-slate-200 hover:bg-primary">
        <NuxtLink to="/">
          Picrosser
        </NuxtLink>
      </div>
      <div class="navbar-end space-x-2 text-stone-100">
        <div class="btn btn-ghost hover:bg-primary">
          <NuxtLink to="/play">
            Play
          </NuxtLink>
        </div>
        <DarkModeToggle />
        <div class="btn btn-ghost hover:bg-primary">
          <input id="drawer" type="checkbox" class="drawer-toggle" />
          <label for="drawer">
            <Icon name="menu" size="1.75em" class="swap-off" />
          </label>
        </div>
      </div>
    </nav>
    <div class="drawer">
      <div
      class="p-8 min-h-full bg-stone-100 dark:bg-slate-800 drawer-content"
      >
        <NuxtPage />
      </div>
      <div class="drawer-side">
        <label for="drawer" aria-label="close sidebar" class="drawer-overlay"></label>
        <div class="bg-slate-800">
          Drawer
        </div>
      </div>
    </div>
  </main> -->
</template>

<style>
</style>
