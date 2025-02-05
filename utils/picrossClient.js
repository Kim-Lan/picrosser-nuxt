export function getGridWithoutXString(grid) {
  const gridWithoutX = [];
  for (let r = 0; r < grid.length; r++) {
    const row = [];
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] == -1) {
        row.push(0);
      } else {
        row.push(grid[r][c]);
      }
    }
    gridWithoutX.push(row);
  }
  return (gridWithoutX.flat()).join('');
}
