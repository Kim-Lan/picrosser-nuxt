<script setup>
const props = defineProps({
  currentStats: {
    type: Object,
    default: null
  },
  recordStats: {
    type: Object,
    default: null
  }
});

// onBeforeMount(() => fetchUserStats());

const SIZES = ['5x5', '10x10', '15x15', '20x20', '25x25'];

// const currentStats = ref(null);
// const recordStats = ref(null);

const statTableHeaders = [
  {
    title: 'Puzzle Size',
    align: 'start',
    sortable: 'false',
    key: 'size',
  },
  {
    title: 'Current',
    align: 'center',
    children: [ { title: 'Single' }, { title: 'Mean of 3' }, { title: 'Average of 5' }, { title: 'Average of 12' }]
  },
  {
    title: 'Best',
    align: 'center',
    children: [ { title: 'Single' }, { title: 'Mean of 3' }, { title: 'Average of 5' }, { title: 'Average of 12' }]
  },
];

// async function fetchUserStats() {
//   const { data, error } = await useFetch('/api/user/getUserStats', {
//     method: 'GET',
//     query: { username: props.username }
//   });
//   currentStats.value = data.value.currentStats;
//   recordStats.value = data.value.recordStats;
// }

</script>

<template>
  <div>
    <v-data-table
      :headers="statTableHeaders"
      :items="SIZES"
      :hide-default-footer="true"
    >
      <template #item="{ item: dimensions }">
        <tr>
          <td>
            {{ dimensions }}
          </td>
          <td>
            {{ currentStats && currentStats[dimensions] && currentStats[dimensions].single && currentStats[dimensions].single !== -1 ? formatTime(currentStats[dimensions].single) : '-' }}
          </td>
          <td>
            {{ currentStats && currentStats[dimensions] && currentStats[dimensions].meanOfThree && currentStats[dimensions].meanOfThree !== -1 ? formatTime(currentStats[dimensions].meanOfThree) : '-'}}
          </td>
          <td>
            {{ currentStats && currentStats[dimensions] && currentStats[dimensions].averageOfFive && currentStats[dimensions].averageOfFive !== -1 ? formatTime(currentStats[dimensions].averageOfFive) : '-' }}
          </td>
          <td>
            {{ currentStats && currentStats[dimensions] && currentStats[dimensions].averageOfTwelve && currentStats[dimensions].averageOfTwelve !== -1 ? formatTime(currentStats[dimensions].averageOfTwelve) : '-' }}
          </td>
          <td>
            {{ recordStats && recordStats[dimensions] && recordStats[dimensions].single && recordStats[dimensions].single !== -1 ? formatTime(recordStats[dimensions].single) : '-' }}
          </td>
          <td>
            {{ recordStats && recordStats[dimensions] && recordStats[dimensions].meanOfThree && recordStats[dimensions].meanOfThree !== -1 ? formatTime(recordStats[dimensions].meanOfThree) : '-'}}
          </td>
          <td>
            {{ recordStats && recordStats[dimensions] && recordStats[dimensions].averageOfFive && recordStats[dimensions].averageOfFive !== -1 ? formatTime(recordStats[dimensions].averageOfFive) : '-' }}
          </td>
          <td>
            {{ recordStats && recordStats[dimensions] && recordStats[dimensions].averageOfTwelve && recordStats[dimensions].averageOfTwelve !== -1 ? formatTime(recordStats[dimensions].averageOfTwelve) : '-' }}
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>
