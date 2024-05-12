<script lang="ts" setup>
definePageMeta({
  middleware: 'guest',
});
</script>

<template>
  <v-container class="w-full flex justify-center font-mono">
    <AuthForm />
  </v-container>
</template>

<style scoped></style>
