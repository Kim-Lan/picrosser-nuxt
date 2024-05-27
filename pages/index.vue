<script lang="ts" setup>
useHead({
  title: 'Play Picross the puzzle game online!',
})

const { data: authData } = useAuth();

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
  <v-container>
    <VerifyEmailAlert />
    <div
      v-if="authData"
      class="font-mono text-xl my-4"
    >
      Welcome
      <NuxtLink
        :to="{ name: 'user-username', params: { username: authData.user.username }}"
        class="underline"  
      >
        {{  authData?.user?.username }}
      </NuxtLink>!
    </div>
    <div>Press
      <v-btn class="mx-2 font-weight-bold" color="blue-darken-1" @click="navigatePlay">
        Play
      </v-btn>
      to start playing!</div>
  </v-container>
</template>

<style scoped></style>
