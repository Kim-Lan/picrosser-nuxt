
import { createGrid } from '~/server/utils/grid'
import { useStorage } from '@vueuse/core'

// interface PuzzleState {
//   height: number
//   width: number
//   puzzleId: string
//   userGrid: array
//   userKeys: array
//   actionHistory: array
//   solved: boolean
// }

export const usePuzzle = defineStore('puzzle', () => {
  const height = useStorage('height', 5);
  const width = useStorage('width', 5);
  const puzzleId = ref('');
  const userGrid = ref([]);
  const userKeys = ref([]);
  const isSolved = ref(false);

  function newPuzzle(h: number, w: number, id?: string) {
    height.value = h;
    width.value = w;
    isSolved.value = false;
    userGrid.value = createGrid(height.value, width.value);
    userKeys.value = [];
    puzzleId.value = id;
  }

  function resetState() {
    userGrid.value = createGrid(height.value, width.value);
    userKeys.value = [];
  }

  function getSize() {
    return { height, width };
  }

  function setSolved(value) {
    isSolved.value = value;
  }

  return {
    height,
    width,
    puzzleId,
    userGrid,
    userKeys,
    isSolved,
    newPuzzle,
    getSize,
    resetState,
    setSolved
  }
});
