import { useTimestamp } from '@vueuse/core'
import { formatTime } from '~/utils/time'

const { timestamp: now } = useTimestamp({ controls: true });

export const useStopwatch = defineStore('stopwatch', () => {
  const startTimestamp = ref(0);
  const endTimestamp = ref(0);
  const elapsedTime = computed(() => isRunning.value ? formatTime(now.value - startTimestamp.value) : formatTime(endTimestamp.value - startTimestamp.value));
  const isRunning = ref(false);

  function start() {
    startTimestamp.value = now.value;
    isRunning.value = true;
  }

  function stop() {
    if (isRunning.value) {
      endTimestamp.value = now.value;
      isRunning.value = false;
    }
  }

  function reset() {
    startTimestamp.value = now.value;
    endTimestamp.value = startTimestamp.value;
    isRunning.value = false;
  }

  return {
    startTimestamp,
    endTimestamp,
    elapsedTime,
    isRunning,
    start,
    stop,
    reset
  }
},
{
  persist: true,
});
