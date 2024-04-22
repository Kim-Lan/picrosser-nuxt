
import { createGrid } from '~/server/utils/grid'
import { useStorage } from '@vueuse/core'

// interface PuzzleState {
//   height: number
//   width: number
//   puzzleID: string
//   userGrid: array
//   userKeys: array
//   actionHistory: array
//   solved: boolean
// }

export const usePuzzle = defineStore('puzzle', () => {
  const height = useStorage('height', 5);
  const width = useStorage('width', 5);
  const puzzleID = ref('');
  const userGrid = ref([]);
  const userKeys = ref([]);
  const actionHistory = ref([]);
  const solved = ref(false);

  function newPuzzle(h: number, w: number, id?: string) {
    height.value = h;
    width.value = w;
    solved.value = false;
    userGrid.value = createGrid(height.value, width.value);
    userKeys.value = [];
    actionHistory.value = [];
    puzzleID.value = id;
  }

  function resetState() {
    userGrid.value = createGrid(height.value, width.value);
    userKeys.value = [];
  }

  function getSize() {
    return { height, width };
  }

  function setSolved(value) {
    solved.value = value;
  }

  return {
    height,
    width,
    puzzleID,
    userGrid,
    userKeys,
    actionHistory,
    solved,
    newPuzzle,
    getSize,
    resetState,
    setSolved
  }
});
