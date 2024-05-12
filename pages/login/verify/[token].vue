<script setup lang="ts">
const route = useRoute();
const token = route.params.token;

const isVerified = ref(true);

onMounted(() => verifyEmail());

async function verifyEmail() {
  try {
    const { data } = await useFetch('/api/auth/verifyEmail', {
      method: 'POST',
      body: {
        token
      }
    });
    isVerified.value = data.value;
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <v-container>
    <v-alert
      v-if="isVerified"
      type="success"
    >
      Email verified!
    </v-alert>
    <v-alert
      v-if="!isVerified"
      type="error"
    >
      Error while verifying email
    </v-alert>
  </v-container>
</template>
