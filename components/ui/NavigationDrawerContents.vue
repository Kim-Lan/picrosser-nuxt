<script setup lang="ts">
const { data: authData, signOut } = useAuth();

async function onLogout() {
  try {
    await signOut({
      redirect: false,
    });
  } catch(e) {
    console.log(e);
  }
}

const route = useRoute();
const puzzle = usePuzzle();

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
  <div
    class="flex flex-col gap-4 px-6 py-4"
  >
    <div
      v-if="authData"
      class="font-mono"
    >
      Logged in as
      <NuxtLink
        :to="{ name: 'user-username', params: { username: authData.user.username }}"
        class="underline"  
      >
        {{ authData?.user?.username }}
      </NuxtLink>
    </div>

    <div class="w-full hidden max-sm:block">
      <v-btn class="w-full font-weight-bold" variant="plain" @click="navigatePlay">
        Play
      </v-btn>
    </div>

    <Settings />
    <v-btn v-if="!authData" color="blue-darken-1"><NuxtLink to="/login">Login / Register</NuxtLink></v-btn>
    <v-btn v-if="authData" color="blue-darken-1" @click="onLogout">Logout</v-btn>
  </div>
</template>
