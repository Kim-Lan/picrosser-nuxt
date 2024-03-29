/* eslint-disable space-in-parens */
import { useStorage, useTimestamp } from '@vueuse/core'
import { formatTime } from '~/utils/time'

// interface StopwatchState {
//   // startTimestamp: number
//   // pauseTimestamp: number
//   // pausedTime: number
//   // elapsedTime?: number
//   // isRunning?: boolean
//   // currentPause?: number
//   startTimestamp: number
//   endTimestamp: number
//   elapsedTime: number
//   isRunning: boolean
// }

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

// export const useStopwatch = defineStore('stopwatch', {
//   state: (): StopwatchState => {
//     return useStorage('stopwatch', {
//       startTimestamp: 0,
//       pauseTimestamp: 0,
//       pausedTime: 0
//     })
//   },
//   getters: {
//     isRunning: state => state.startTimestamp && !state.pauseTimestamp,
//     currentPause(): number {
//       return (this.isRunning ? 0 : (now.value - this.pauseTimestamp));
//     },
//     elapsedTime(): number {
//       return (this.isRunning || this.currentPause ? now.value - this.startTimestamp - this.pausedTime - this.currentPause : 0)
//     }
//   },
//   actions: {
//     start() {
//       this.startTimestamp = now.value;
//       this.pauseTimestamp = 0;
//       this.pausedTime = 0;
//     },
//     pause() {
//       if (!this.pauseTimestamp) {
//         this.pauseTimestamp = now.value;
//       }
//     },
//     resume() {
//       this.pausedTime += this.currentPause;
//       this.pauseTimestamp = 0;
//     },
//     reset() {
//       this.startTimestamp = 0;
//       this.pausedTime = 0;
//       this.pauseTimestamp = 0;
//     }
//   }
// });
