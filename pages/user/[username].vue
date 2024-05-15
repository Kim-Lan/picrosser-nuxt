<script lang="ts" setup>
const route = useRoute();
const username = route.params.username;

const user = ref(null);
const errorMessage = ref('');

onMounted(() => fetchUser());

async function fetchUser() {
  try {
    const { data, error } = await useFetch('/api/user/getUser', {
      method: 'GET',
      query: { username },
    });
    if (error.value) {
      errorMessage.value = error.value.statusMessage;
    }
    user.value = data.value;
  } catch (error) {
    errorMessage.value = error.statusMessage;
  }
}
</script>

<template>
  <v-container>
    <v-alert v-if="errorMessage" type="error">
      {{ errorMessage }}
    </v-alert>
    {{ user }}
  </v-container>
</template>

<style scoped></style>
