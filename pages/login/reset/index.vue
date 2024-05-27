<script setup lang="ts">
definePageMeta({
  middleware: 'guest',
});

useHead({
  title: 'Reset Password',
})

const sendResetSuccess = ref(false);
const errorMessage = ref('');

const isValid = ref(false);
const isLoading = ref(false);

const email = ref('');

async function onFormSubmit() {
  if (!isValid.value) {
    return;
  }
  try {
    isLoading.value = true;
    const { data, error }= await useFetch('/api/auth/sendResetPassword', {
      method: 'POST',
      body: {
        email: email.value
      }
    });
    if (error.value) {
      console.log(error.value);
      sendResetSuccess.value = false;
      errorMessage.value = error.value.statusMessage;
    }
    if (data.value) {
      console.log(data.value);
      sendResetSuccess.value = true;
    }
  } catch (error) {
    errorMessage.value = error.statusMessage;
  } finally {
    isLoading.value = false;
  }
}

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function emailRules(value) {
  if (!value) {
    return 'Email is required';
  } else if (!emailRegex.test(value)) {
    return 'Invalid email';
  }
  return true;
}
</script>

<template>
  <v-container class="w-full flex justify-center font-mono">
    <v-card class="w-2/5 max-sm:w-full pa-8 pb-12">
      <div class="font-mono text-center text-xl mb-8">
        Picrosser
      </div>
      <v-alert
        v-if="sendResetSuccess"
        type="success"
        text="Email Sent"
        class="mb-4"
      ></v-alert>
      <v-alert
        v-if="errorMessage"
        type="error"
        class="mb-4"
      >
        {{ errorMessage }}
      </v-alert>
      <v-form v-model="isValid" @submit.prevent="onFormSubmit">
        <div>Email</div>
        <v-text-field
          v-model="email"
          validate-on="blur"
          :rules="[emailRules]"
          :disabled="isLoading"
          placeholder="Email"
          type="email"
          density="compact"
          variant="outlined"
        />
        <v-btn
          type="submit"
          :disabled="isLoading"
          color="blue-darken-1"
          class="w-full mt-2"
        >
          Reset Password
        </v-btn>

        <div class="mt-20 cursor-pointer text-blue-darken-1 text-xs text-center underline" @click="navigateTo('/login')">
          Return to Login
        </div>
      </v-form>
    </v-card>
  </v-container>
</template>
