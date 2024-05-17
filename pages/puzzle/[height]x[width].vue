<script setup lang="ts">
const route = useRoute();
const height = route.params.height;
const width = route.params.width;
const id = route.query.id;

const loadingIndicator = useLoadingIndicator();
const errorMessage = ref('');

const attempts = ref([]);

const headers = [
  {
    title: 'Date & Time',
    align: 'start',
    sortable: true,
    key: 'date',
    value: item => `${new Date(item.startTime)}`,
  },
  {
    title: 'User',
    align: 'start',
    sortable: true,
    key: 'user',
    value: item => `${Number(item.user.username)}`
  },
  {
    title: 'Result',
    align: 'start',
    sortable: true,
    key: 'result',
    value: item => `${Number(item.totalTime)}`
  }
];

onMounted(() => fetchPuzzle());

async function fetchPuzzle() {
  try {
    loadingIndicator.start();
    const { data, error } = await useFetch('/api/puzzle/getPuzzleRecordById', {
      method: 'GET',
      query: { height, width, id }
    });
    if (error.value) {
      errorMessage.value = error.value.statusMessage;
    }
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
        <div class="text-2xl">{{ height }}x{{ width }} Puzzle</div>
        <div>{{ id }}</div>
      </div>
      <NuxtLink
        :to="{
          name: 'play-heightxwidth',
          params: { height, width },
          query: { id },
        }"
      >
        <v-btn color="blue-darken-1">Play</v-btn>
      </NuxtLink>
      <div class="w-1/2 max-lg:w-3/4 max-md:w-full">
        <v-data-table
          :headers="headers"
          :items="attempts"
        >
          <template #item="{ item: attempt }">
            <tr>
              <td>
                {{ new Date(attempt.startTime).toLocaleString().replace(',', '') }}
              </td>
              <td>
                <NuxtLink
                  :to="{
                    name: 'user-username',
                    params: { username: attempt.user.username },
                  }"
                  class="underline"  
                >
                  {{  attempt.user.username }}
                </NuxtLink>
              </td>
              <td>
                {{ formatTime(attempt.totalTime) }}
              </td>
            </tr>
          </template>
        </v-data-table>
      </div>
      <!-- <v-table
        class="w-1/2 max-lg:w-3/4 max-md:w-full"
      >
        <thead>
          <tr>
            <th>Date & Time</th>
            <th class="text-center">User</th>
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
                  name: 'user-username',
                  params: { username: attempt.user.username },
                }"
                class="underline"  
              >
                {{  attempt.user.username }}
              </NuxtLink>
            </td>
            <td class="text-center">
              {{ formatTime(attempt.totalTime) }}
            </td>
          </tr>
        </tbody>
      </v-table> -->
    </div>
  </v-container>
</template>
