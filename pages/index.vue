<script lang="ts" setup>
useHead({
  title: 'Play Picrosser online!',
})

const { data: authData } = useAuth();
</script>

<template>
  <v-container>
    <VerifyEmailAlert />
    <div
      class="font-mono text-xl my-4 text-center"
    >
      Welcome
        <NuxtLink
          v-if="authData"
          :to="{ name: 'user-username', params: { username: authData.user.username }}"
          class="underline"  
        >
          {{  authData?.user?.username }}
        </NuxtLink>
        <span v-else>to Picrosser</span>!
    </div>
    <!-- <div>Press
      <v-btn class="mx-2 font-weight-bold" color="blue-darken-1" @click="navigatePlay">
        Play
      </v-btn>
      to start playing!
    </div> -->
    <div class="flex flex-col align-center gap-8">
      <v-img :width="250" src="~/assets/images/example-puzzle.png" />
      <div class="flex flex-row align-center justify-center gap-4">
        <v-btn class="w-1/2 font-weight-bold" color="blue-darken-1" @click="navigateTo('/play')">
          Play
        </v-btn>
        <v-btn class="w-1/2 font-weight-bold" color="blue-darken-1" @click="navigateTo('/tutorial')">
          Tutorial
        </v-btn>
      </div>
    </div>
  </v-container>
</template>

<style scoped></style>
