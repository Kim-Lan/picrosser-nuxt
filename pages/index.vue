<script lang="ts" setup>
const { data: authData } = useAuth();
</script>

<template>
  <v-container>
    <VerifyEmailAlert />
    <div v-if="authData">
      Welcome
      <NuxtLink
        :to="{ name: 'user-username', params: { username: authData.user.username }}"
        class="underline"  
      >
        {{  authData?.user?.username }}
      </NuxtLink>!
    </div>
    <div>Press "Play" to start playing!</div>
  </v-container>
</template>

<style scoped></style>
