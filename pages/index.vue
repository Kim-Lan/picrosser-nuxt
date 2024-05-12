<script lang="ts" setup>
const { data: authData } = useAuth();
</script>

<template>
  <v-container>
    <div v-if="authData">Welcome {{  authData.user.username }}!</div>
    <div>Press "Play" to start playing!</div>
  </v-container>
</template>

<style scoped></style>
