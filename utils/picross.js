const { getColumn } = require('./grid.js');

module.exports = { getBlocks, getKeys, goalString, gridToNon }

function getBlocks(arr) {
  const result = [];
  let current = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === '1') {
      current++;
    } else if (current > 0) {
      result.push(current);
      current = 0;
    }
  }
  if (current > 0) { result.push(current); }

  return result;
}

function getKeys(grid) {
  const rowKeys = [];
  for (let r = 0; r < grid.length; r++) {
    rowKeys[r] = getBlocks(grid[r]);
  }

  const colKeys = [];
  for (let c = 0; c < grid[0].length; c++) {
    colKeys[c] = getBlocks(getColumn(grid, c));
  }
  return {
    rows: rowKeys,
    columns: colKeys
  };
}

function goalString(grid) {
  return (grid.flat()).join('');
}

function gridToNon(grid) {
  const { rows, columns } = getKeys(grid);

  const strArray = [];
  strArray.push("width " + columns.length);
  strArray.push("height " + rows.length);

  strArray.push("");
  strArray.push("rows");
  for (let i = 0; i < rows.length; i++) {
    strArray.push(rows[i].join(','));
  }

  strArray.push("");
  strArray.push("columns");
  for (let j = 0; j < columns.length; j++) {
    strArray.push(columns[j].join(','));
  }

  strArray.push("");
  strArray.push("goal \"" + goalString(grid) + "\"");
  strArray.push("");
  return strArray.join("\n");
}
