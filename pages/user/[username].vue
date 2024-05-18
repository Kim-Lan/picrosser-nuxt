<script setup>
const route = useRoute();
const username = route.params.username;

const loadingIndicator = useLoadingIndicator();
const errorMessage = ref('');

const user = ref({
  createdAt: null,
});
const attempts = ref([]);

const SIZES = ['5x5', '10x10', '15x15', '20x20', '25x25'];

const attemptTableSizeFilter = ref('');

const attemptTableHeaders = [
  {
    title: 'Date & Time',
    align: 'start',
    sortable: true,
    key: 'date',
    value: item => `${item.startTime}`,
  },
  {
    title: 'Puzzle',
    align: 'start',
    sortable: true,
    key: 'puzzle',
    value: item => `${item.puzzle.height}x${item.puzzle.width}`
  },
  {
    title: 'Result',
    align: 'start',
    sortable: true,
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
  <v-container class="font-mono w-1/2 max-lg:w-3/4 max-md:w-full">
    <v-alert v-if="errorMessage" type="error">
      {{ errorMessage }}
    </v-alert>
    <div class="flex flex-col align-center mt-4 gap-8">
      <div class="w-full flex flex-col align-center">
        <div class="text-2xl">{{ username }}</div>
        <div>Joined {{ new Date(user.createdAt).toLocaleDateString() }}</div>
      </div>

      <UserStatsTable :username="username" />

      <div class="mt-12">
        <v-select
          v-model="attemptTableSizeFilter"
          label="Filter by Size"
          :items="SIZES"
        ></v-select>
        <v-data-table
          :headers="attemptTableHeaders"
          :items="attempts"
          :items-per-page-options="itemsPerPageOptions"
          :search="attemptTableSizeFilter"
          items-per-page="5"
        >
          <template #item="{ item: attempt }">
            <tr>
              <td>
                {{ new Date(attempt.startTime).toLocaleString().replace(',', '') }}
              </td>
              <td>
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
      </v-table> -->
    </div>
  </v-container>
</template>

<style scoped></style>
