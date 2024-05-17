<script lang="ts" setup>
const route = useRoute();
const username = route.params.username;

const loadingIndicator = useLoadingIndicator();
const errorMessage = ref('');

const user = ref({});
const attempts = ref([]);

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
    user.value = {
      createdAt: data.value.createdAt,
    };
    attempts.value = data.value.attempts.reverse();
  } catch (error) {
    errorMessage.value = error.statusMessage;
  } finally {
    loadingIndicator.finish();
  }
}
</script>

<template>
  <v-container class="font-mono">
    <v-alert v-if="errorMessage" type="error">
      {{ errorMessage }}
    </v-alert>
    <div class="flex flex-col align-center mt-4 gap-6">
      <div class="w-full flex flex-col align-center">
        <div class="text-2xl">{{ username }}</div>
        <div>Joined {{ new Date(user.createdAt).toLocaleDateString() }}</div>
      </div>
      <v-table
        class="w-1/2 max-lg:w-3/4 max-md:w-full"
      >
        <thead>
          <tr>
            <th>Date & Time</th>
            <th class="text-center">Puzzle</th>
            <th class="text-center">Result</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(attempt, index) in attempts" :key="index">
            <td>
              {{ new Date(attempt.startTime).toLocaleString().replace(',', '') }}
            </td>
            <td class="text-center">
              <NuxtLink
                :to="{
                  name: 'puzzle-heightxwidth',
                  params: { height: attempt.puzzle.height, width: attempt.puzzle.width },
                  query: { id: attempt.puzzle._id },
                }"
                class="underline"  
              >
                {{  attempt.puzzle.height }}x{{ attempt.puzzle.width }}
              </NuxtLink>
            </td>
            <td class="text-center">
              {{ formatTime(attempt.totalTime) }}
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </v-container>
</template>

<style scoped></style>
