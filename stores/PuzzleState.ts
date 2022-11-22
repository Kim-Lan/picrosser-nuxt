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

export const usePuzzle = ( width: number, height: number ) => defineStore(`puzzle/${width}x${height}`, () => {
  const width = ref(5);
  const height = ref(5);
  const id = ref('');
  const userGrid = ref([]);
  const userKeys = ref([]);
  const actionHistory = ref([]);
  const solved = ref(false);

  function newPuzzle() {
    solved.value = false;
    userGrid.value = [];
    userKeys.value = [];
    actionHistory.value = [];
  }
});
