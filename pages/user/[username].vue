<script lang="ts" setup>
const route = useRoute();
const username = route.params.username;

const loadingIndicator = useLoadingIndicator();

const user = ref(null);
const errorMessage = ref('');

onMounted(() => fetchUser());

async function fetchUser() {
  try {
    loadingIndicator.start();
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
  } finally {
    loadingIndicator.finish();
  }
}
</script>

<template>
  <v-container>
    <v-alert v-if="errorMessage" type="error">
      {{ errorMessage }}
    </v-alert>
    <div v-if="user" >
      {{ user.username }}
      {{ user.createdAt }}
      <div v-for="(attempt, index) in user.attempts" :key="index">
        {{ attempt }}
      </div>
    </div>
  </v-container>
</template>

<style scoped></style>
