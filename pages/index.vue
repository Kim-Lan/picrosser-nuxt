<script lang="ts" setup>
const { data: authData } = useAuth();
</script>

<template>
  <div>
    <div v-if="authData">Welcome {{  authData.user.username }}!</div>
    <div>Press "Play" to start playing!</div>
  </div>
</template>

<style scoped></style>
