import { Puzzle } from '~/server/models/Puzzle'
import { getSolutionGrid } from '~/server/utils/picross'

export default defineEventHandler(async (event) => {
  const { puzzleId, gridJSON } = getQuery(event);

  const grid = JSON.parse(gridJSON);

  const puzzle = await Puzzle.findOne({ _id: puzzleId });
  if (!puzzle) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Puzzle not found',
    })
  }

  const solutionGrid = getSolutionGrid(puzzle.goal, puzzle.width);

  let errorCount = 0;
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] === '-1' && solutionGrid[r][c] === '1') {
        errorCount++;
      } else if (grid[r][c] === '1' && solutionGrid[r][c] === '0') {
        errorCount++;
      }
    }
  }
  return {
    errorCount
  };
})
