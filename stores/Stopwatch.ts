/* eslint-disable space-in-parens */
import { useStorage } from '@vueuse/core'

interface StopwatchState {
  startTimestamp: number
  pauseTimestamp: number
  pausedTime: number
  elapsedTime?: number
  isRunning?: boolean
  currentPause?: number
}

const { timestamp: now } = useTimestamp({ controls: true });

export const useStopwatch = ( width: number, height:number ) => defineStore(`stopwatch/${width}x${height}`, {
  state: (): StopwatchState => {
    return useStorage(`stopwatch/${width}x${height}`, {
      startTimestamp: 0,
      pauseTimestamp: 0,
      pausedTime: 0
    })
  },
  getters: {
    isRunning: state => state.startTimestamp && !state.pauseTimestamp,
    currentPause(): number {
      return (this.isRunning ? 0 : (now.value - this.pauseTimestamp));
    },
    elapsedTime(): number {
      return (this.isRunning || this.currentPause ? now.value - this.startTimestamp - this.pausedTime - this.currentPause : 0)
    }
  },
  actions: {
    start() {
      this.startTimestamp = now.value;
      this.pauseTimestamp = 0;
      this.pausedTime = 0;
    },
    pause() {
      if (!this.pauseTimestamp) {
        this.pauseTimestamp = now.value;
      }
    },
    resume() {
      this.pausedTime += this.currentPause;
      this.pauseTimestamp = 0;
    },
    reset() {
      this.startTimestamp = 0;
      this.pausedTime = 0;
      this.pauseTimestamp = 0;
    }
  }
})();
