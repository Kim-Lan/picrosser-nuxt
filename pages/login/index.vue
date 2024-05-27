<script lang="ts" setup>
definePageMeta({
  middleware: 'guest',
});

useHead({
  title: 'Login to Picrosser',
})

</script>

<template>
  <v-container class="w-full flex justify-center font-mono">
    <AuthForm />
  </v-container>
</template>

<style scoped></style>
