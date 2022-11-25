/* eslint-disable space-in-parens */

interface PuzzleState {
  width: number
  height: number
  puzzleID: string
  userGrid: array
  userKeys: array
  actionHistory: array
  solved: boolean
}

export const usePuzzle = ( w: number, h: number ) => defineStore(`puzzle/${w}x${h}`, () => {
  const width = ref(w);
  const height = ref(h);
  const puzzleID = ref('');
  const userGrid = ref([]);
  const userKeys = ref([]);
  const actionHistory = ref([]);
  const solved = ref(false);

  function newPuzzle(id: string) {
    solved.value = false;
    userGrid.value = createGrid(width.value, height.value);
    printGrid(userGrid.value);
    userKeys.value = [];
    actionHistory.value = [];
    puzzleID.value = id;
  }

  return {
    width,
    height,
    puzzleID,
    userGrid,
    userKeys,
    actionHistory,
    solved,
    newPuzzle
  }
})();
