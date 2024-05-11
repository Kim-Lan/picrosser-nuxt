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

const username = ref('');
const email = ref('');
const password = ref('');

const { signIn } = useAuth();

async function onFormSubmit() {
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
      }
      if (data.value) {
        console.log('Successfully registered');
        username.value = '';
        email.value = '';
        password.value = '';
        variant.value = 'LOGIN';
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
  <v-form @submit.prevent="onFormSubmit">
    <div v-if="variant === 'REGISTER'">Username</div>
    <v-text-field
      v-if="variant === 'REGISTER'"
      v-model="username"
      :disabled="isLoading"
      placeholder="Username"
      type="text"
      density="compact"
      variant="outlined"
      required
    />
    <div>Email</div>
    <v-text-field
      v-model="email"
      :disabled="isLoading"
      placeholder="Email"
      type="email"
      density="compact"
      variant="outlined"
      required
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
      :disabled="isLoading"
      placeholder="Password"
      :type="showPassword ? 'text' : 'password'"
      :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      density="compact"
      variant="outlined"
      required
      @click:append-inner="showPassword = !showPassword"
    />
    <v-btn
      type="submit"
      :disabled="isLoading"
      color="blue-darken-1"
      :class="{ 'opacity-50 cursor-not-allowed' : isLoading }"
      class="w-full">
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
