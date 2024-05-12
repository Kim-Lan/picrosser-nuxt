<script setup lang="ts">
const { data: authData } = useAuth();

const isVerified = ref(false);
const isLoading = ref(false);
const emailSent = ref(false);

onMounted(() => checkVerified());

async function checkVerified() {
  try {
    const response = await $fetch('/api/auth/checkVerified', {
      method: 'GET',
      query: {
        email: authData.value.user.email,
      },
    });
    isVerified.value = response;
  } catch (error) {
    console.log(error);
  }
}

async function onSendVerification() {
  try {
    isLoading.value = true;
    const response = await $fetch('/api/auth/verifyEmail', {
      method: 'GET',
      query: {
        email: authData.value.user.email,
      },
    });
    console.log(response);
    if (response) {
      emailSent.value = true;
    }
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false;
  }
}

</script>

<template>
  <v-alert
    v-if="authData && !isVerified"
    type="warning"
    text="Please verify your email."
    class="m-4"
  >
    <v-btn
      :disabled="isLoading || emailSent"
      class="mx-4"
      elevation="0"
      @click="onSendVerification"
    >
      {{ emailSent ? "Verification Email Sent" : "Send Verification Email" }}
    </v-btn>
  </v-alert>
</template>


