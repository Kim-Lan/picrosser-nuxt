const PUZZLE_STORE = `puzzle/${width}x${height}`;

interface PuzzleState {
  width: number
  height: number
  id: string
  userGrid: array
  userKeys: array
  actionHistory: array
}

export const usePuzzle = ( width: number, height: number ) => defineStore(PUZZLE_STORE, {
  state: (): PuzzleState => {
    return useLocalStorage(PUZZLE_STORE, {
      width: 5,
      height: 5,
      id: '',
      userGrid: [],
      userKeys: [],
      actionHistory: []
    })
  }
});
