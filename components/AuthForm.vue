<script setup lang="ts">
type VARIANT = 'LOGIN' | 'REGISTER';
const variant = ref<VARIANT>('LOGIN');

const showPassword = ref(false);

function toggleVariant() {
  if (variant.value === 'REGISTER') {
    variant.value = 'LOGIN';
  } else {
    variant.value = 'REGISTER';
  }
}

const isLoading = ref(false);
const isValid = ref(false);
const registerSuccess = ref(false);
const errorMessage = ref('');

const username = ref('');
const email = ref('');
const password = ref('');

const { signIn } = useAuth();

const USERNAME_INVALID_CHARACTERS = ' ?;:,.`\'"(){}[]|\\/';

function usernameRules(value) {
  if (!value) {
    return 'Username is required';
  }

  for (let i = 0; i < USERNAME_INVALID_CHARACTERS.length; i++) {
    if (value.includes(USERNAME_INVALID_CHARACTERS[i])) {
      return 'Username contains invalid character(s)';
    }
  }
    
  if (value.length < 4) {
    return 'Username must be at least 4 characters long';
  }
  return true;
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

function passwordRules(value) {
  if (!value) {
    return 'Password is required';
  } else if (variant.value === 'REGISTER') {
    if (value.length < 8) {
      return 'Password must be at least 8 characters long';
    }
  }
  return true;
}

async function onFormSubmit() {
  if (!isValid.value) {
    return;
  }
  if (variant.value === 'REGISTER') {
    try {
      isLoading.value = true;
      const { data, error } = await useFetch('/api/auth/register', {
        method: 'POST',
        body: {
          username: username.value,
          email: email.value,
          password: password.value,
        },
      });
      if (error.value) {
        console.log(error.value);
        errorMessage.value = error.value.statusMessage;
      }
      if (data.value) {
        console.log('Successfully registered');
        username.value = '';
        email.value = '';
        password.value = '';
        variant.value = 'LOGIN';
        registerSuccess.value = true;
      }
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  } else {
    try {
      isLoading.value = true;

      const result = await signIn('credentials', {
        email: email.value,
        password: password.value,
        redirect: false,
      });

      if (result?.ok && !result.error) {
        console.log('Successfully Logged In');
        registerSuccess.value = false;
        navigateTo('/');
      } else {
        console.log('Something Went Wrong');
      }

    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  }
}
</script>

<template>
<v-card class="w-2/5 max-sm:w-full pa-8 pb-12">
  <div class="font-mono text-center text-xl mb-8">Picrosser</div>
  <v-alert
    v-if="registerSuccess"
    type="success"
    text="Successfully Registered"
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
    <div v-if="variant === 'REGISTER'">Username</div>
    <v-text-field
      v-if="variant === 'REGISTER'"
      v-model="username"
      validate-on="blur"
      :rules="[usernameRules]"
      :disabled="isLoading"
      placeholder="Username"
      type="text"
      density="compact"
      variant="outlined"
    />
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
    <div class="flex flex-row justify-between">
      <div>Password</div>
      <a
        v-if="variant === 'LOGIN'"
        class="text-blue-darken-1 text-xs underline"
        href="#" rel="noopener noreferrer" target="_blank"
      >
        Forgot password?
      </a>
    </div>
    <v-text-field
      v-model="password"
      validate-on="input"
      :rules="[passwordRules]"
      :disabled="isLoading"
      placeholder="Password"
      :type="showPassword ? 'text' : 'password'"
      :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      density="compact"
      variant="outlined"
      @click:append-inner="showPassword = !showPassword"
    />
    <v-btn
      type="submit"
      :disabled="isLoading"
      color="blue-darken-1"
      :class="{ 'opacity-50 cursor-not-allowed' : isLoading }"
      class="w-full mt-4">
      {{ variant === 'LOGIN' ? "Login" : "Register" }}
    </v-btn>

    <div v-if="variant === 'LOGIN'" class="flex flex-row my-4">
      <div class="w-full flex items-center">
        <div class="w-full border-t border-grey"></div>
      </div>
      <div class="flex justify-center text-sm">
        <span class="text-grey px-2">OR</span>
      </div>
      <div class="w-full flex items-center">
        <div class="w-full border-t border-grey"></div>
      </div>
    </div>

    <div v-if="variant === 'LOGIN'" class="w-full text-center">
      <v-btn>
        Login with Google
      </v-btn>
    </div>

    <div class="mt-4 cursor-pointer text-blue-darken-1 text-xs text-center underline" @click="toggleVariant">
      {{ variant === 'LOGIN' ? "Don't have an account?" : "Already have an account?" }}
      {{ variant === 'LOGIN' ? "Create Account" : "Login" }}
    </div>
  </v-form>
</v-card>
</template>
