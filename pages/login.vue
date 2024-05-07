<script lang="ts" setup>
const showPasswordLogin = ref(false);
const showPasswordRegister = ref(false);
</script>

<template>
  <v-container class="w-full flex flex-row flex-wrap justify-between gap-5">
    <v-card title="Login" class="w-2/5 max-sm:w-full">
      <v-form class="p-4">
        <v-text-field label="Email" type="email" required />
        <v-text-field
          label="Password"
          :type="showPasswordLogin ? 'text' : 'password'"
          :append-icon="showPasswordLogin ? 'mdi-eye' : 'mdi-eye-off'"
          required
          @click:append="showPasswordLogin = !showPasswordLogin"
        />
        <v-btn type="submit">
          Login
        </v-btn>
      </v-form>
    </v-card>
    <v-card title="Register" class="w-2/5 max-sm:w-full">
      <v-form class="p-4">
        <v-text-field label="Email" required />
        <v-text-field label="Display Name" required />
        <v-text-field
          label="Password"
          :type="showPasswordLogin ? 'text' : 'password'"
          :append-icon="showPasswordRegister ? 'mdi-eye' : 'mdi-eye-off'"
          required
          @click:append="showPasswordRegister = !showPasswordRegister"
        />
        <v-btn type="submit">
          Register
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<style scoped></style>
