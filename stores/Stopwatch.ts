interface StopwatchState {
  startTimestamp: number
  pauseTimestamp: number
  pausedTime: number
  elapsedTime?: number
  isRunning?: boolean
  currentPause?: number
}

export const useStopwatch = (size: number) => defineStore(`stopwatch/${size}x${size}`, {
  state: (): StopwatchState => {
    return {
      startTimestamp: Date.now(),
      pauseTimestamp: 0,
      pausedTime: 0
    }
  },
  getters: {
    isRunning: state => state.startTimestamp && !state.pauseTimestamp,
    currentPause(): number {
      return (this.isRunning ? 0 : (Date.now() - this.pauseTimestamp));
    },
    elapsedTime(): number {
      return Date.now() - this.startTimestamp - this.pausedTime - this.currentPause
    }
  },
  actions: {
    start() {
      this.startTimestamp = Date.now();
      this.pausedTime = 0;
    },
    pause() {
      if (!this.pauseTimestamp) {
        this.pauseTimestamp = Date.now();
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
