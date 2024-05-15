<script setup lang="ts">
const route = useRoute();
const token = route.params.token;

const isVerified = ref(true);
const { status: authStatus, signOut }= useAuth()

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
    if (authStatus.value === 'authenticated') {
      await signOut({
        redirect: false,
      });
    }
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
      <NuxtLink to="/login" class="underline">Please login again.</NuxtLink>
    </v-alert>
    <v-alert
      v-if="!isVerified"
      type="error"
    >
      Error while verifying email
    </v-alert>
  </v-container>
</template>
