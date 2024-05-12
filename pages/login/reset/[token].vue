<script setup lang="ts">
const route = useRoute();
const token = route.params.token;

const isLoading = ref(false);
const isValid = ref(false);
const resetSuccess = ref(false);
const errorMessage = ref('');

const password = ref('');
const confirmPassword = ref('');

const showPassword = ref(false);
const showConfirmPassword = ref(false);

function passwordRules(value) {
  if (!value) {
    return 'Password is required';
  } else if (value.length < 8) {
    return 'Password must be at least 8 characters long';
  }
  return true;
}

function confirmPasswordRules(value) {
  if (value !== password.value) {
    return 'Passwords do not match';
  }
  return true;
}

async function onFormSubmit() {
  if (!isValid.value) {
    return;
  }
  try {
    isLoading.value = true;
    const { data, error } = await useFetch('/api/auth/resetPassword', {
      method: 'POST',
      body: {
        token,
        newPassword: password.value,
      }
    });
    if (error.value) {
      console.log(error.value);
      errorMessage.value = error.value.statusMessage;
    }
    if (data.value) {
      console.log('Successfully reset password');
      password.value = '';
      confirmPassword.value = '';
      resetSuccess.value = true;
      errorMessage.value = '';
    }
  } catch (error) {
    errorMessage.value = error.statusMessage;
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <v-container class="w-full flex justify-center font-mono">
    <v-card class="w-2/5 max-sm:w-full pa-8 pb-12">
      <div class="font-mono text-center text-xl mb-8">
        Picrosser
      </div>
      <v-alert
        v-if="resetSuccess"
        type="success"
        text="Successfully Reset Password"
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
        <div class="flex flex-row justify-between">
          New Password
        </div>
        <v-text-field
          v-model="password"
          validate-on="submit"
          :rules="[passwordRules]"
          :disabled="isLoading"
          placeholder="Password"
          :type="showPassword ? 'text' : 'password'"
          :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          density="compact"
          variant="outlined"
          @click:append-inner="showPassword = !showPassword"
        />
        <div
        >
          Confirm Password
        </div>
        <v-text-field
          v-model="confirmPassword"
          validate-on="submit"
          :rules="[confirmPasswordRules]"
          :disabled="isLoading"
          placeholder="Confirm Password"
          :type="showConfirmPassword ? 'text' : 'password'"
          :append-inner-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
          density="compact"
          variant="outlined"
          @click:append-inner="showConfirmPassword = !showConfirmPassword"
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
