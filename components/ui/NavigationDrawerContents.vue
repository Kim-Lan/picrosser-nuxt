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

    <div class="flex flex-col align-center w-full gap-2">
      <v-btn class="w-full font-weight-bold" elevation=1 @click="navigateTo('/play')">
        Play
      </v-btn>
      <v-btn class="w-full font-weight-bold" elevation=1 @click="navigateTo('/tutorial')">
        Tutorial
      </v-btn>
    </div>

    <Settings />
    <v-btn v-if="!authData" color="blue-darken-1"><NuxtLink to="/login">Login / Register</NuxtLink></v-btn>
    <v-btn v-if="authData" color="blue-darken-1" @click="onLogout">Logout</v-btn>
  </div>
</template>
