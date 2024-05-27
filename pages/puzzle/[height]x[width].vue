<script setup lang="ts">
const route = useRoute();
const height = route.params.height;
const width = route.params.width;
const id = route.query.id;

useHead({
  title: `Puzzle page for ${height}x${width} Picross | Picrosser`,
})


const loadingIndicator = useLoadingIndicator();
const errorMessage = ref('');

const attempts = ref([]);

const search = ref('');

const headers = [
  {
    title: 'Date & Time',
    align: 'start',
    sortable: true,
    filterable: false,
    key: 'date',
    value: item => `${item.startTime}`,
  },
  {
    title: 'User',
    align: 'start',
    sortable: true,
    filterable: true,
    key: 'user',
    value: item => `${item.user.username}`
  },
  {
    title: 'Result',
    align: 'start',
    sortable: true,
    filterable: false,
    key: 'result',
    value: item => `${item.totalTime}`
  }
];

const itemsPerPageOptions = [
  {value: 5, title: '5'},
  {value: 10, title: '10'},
  {value: 25, title: '25'},
  {value: 50, title: '50'},
  {value: 100, title: '100'},
  {value: -1, title: '$vuetify.dataFooter.itemsPerPageAll'}
]

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
      <div class="w-1/2 max-lg:w-3/4 max-md:w-full flex flex-col gap-6">
        <v-text-field
          v-model="search"
          label="Search User"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          hide-details
          single-line
        ></v-text-field>
        <v-data-table
          :headers="headers"
          :items="attempts"
          :items-per-page-options="itemsPerPageOptions"
          :search="search"
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
