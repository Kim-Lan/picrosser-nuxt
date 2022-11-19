/* eslint-disable space-in-parens */

interface PuzzleState {
  width: number
  height: number
  id: string
  userGrid: array
  userKeys: array
  actionHistory: array
  solved: boolean
}

export const usePuzzle = ( width: number, height: number ) => defineStore(`puzzle/${width}x${height}`, {
  state: (): PuzzleState => {
    return {
      width: 5,
      height: 5,
      id: '',
      userGrid: [],
      userKeys: [],
      actionHistory: [],
      solved: false
    }
  },
  persist: true
});
