interface StopwatchState {
  startTimestamp: number
  pauseTimestamp: number
  pausedTime: number
  elapsedTime?: number
  isRunning?: boolean
  currentPause?: number
}

const { timestamp: now } = useTimestamp({ controls: true });

export const useStopwatch = (size: number) => defineStore(`stopwatch/${size}x${size}`, {
  state: (): StopwatchState => {
    return {
      startTimestamp: now.value,
      pauseTimestamp: 0,
      pausedTime: 0
    }
  },
  persist: true,
  getters: {
    isRunning: state => state.startTimestamp && !state.pauseTimestamp,
    currentPause(): number {
      return (this.isRunning ? 0 : (now.value - this.pauseTimestamp));
    },
    elapsedTime(): number {
      return now.value - this.startTimestamp - this.pausedTime - this.currentPause
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
