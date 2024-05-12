<script setup lang="ts">
const route = useRoute();
const token = route.params.token;

onMounted(() => verifyEmail());

async function verifyEmail() {
  try {
    const { data, error } = await useFetch('/api/auth/verifyEmail', {
      method: 'POST',
      body: {
        token
      }
    });
  } catch (error) {
    console.log(error);
  } finally {
    navigateTo('/');
  }

}
</script>

<template>
  <div></div>
</template>
