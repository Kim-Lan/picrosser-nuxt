const { execSync } = require('child_process');
const fs = require('fs');
const _ = require('lodash/array');
const { gridToNon } = require('./picross.js')
const { createGrid, getColumn, arraySum } = require('./grid.js')

function generate(width: number, height: number) {
  const grid = createGrid(width, height);

  // fill one cell in each row
  for (let i = 0; i < height; i++) {
    const index = Math.floor(Math.random() * width);
    grid[i][index] = '1';
  }

  // check if column is empty; fill one cell in column if empty
  for (let j = 0; j < width; j++) {
    const col = getColumn(grid, j);
    // console.log('col ' + j + ': ' + col);
    if (_.indexOf(col, '1') < 0) {
      const index = Math.floor(Math.random() * height);
      grid[index][j] = '1';
    }
  }

  // randomly fill the rest without full rows or cols
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (grid[i][j] !== '1') {
        const rowSum = arraySum(grid[i]);
        const colSum = arraySum(getColumn(grid, j));
        if (rowSum < width - 1 && colSum < height - 1) {
          grid[i][j] = Math.round(Math.random()).toString();
        }
      }
    }
  }
  check(grid);
}

function check(grid: Array<Array<string>>) {
  const data = gridToNon(grid);
  const path = getNewPath();
  fs.writeFileSync(path, data);
  const output = (execSync('./naughty -u < ' + path)).toString();
  // console.log(output);
  if (!output.includes('UNIQUE')) {
    fs.unlinkSync(path);
  }
}

function getNewPath() {
  let id = '';
  let path = '';
  do {
    id = randomID();
    path = './non/' + id + '.non';
  } while (fs.existsSync(path));
  return path;
}

const CHAR = 'ABCDEFGHJKMNPQRSTUVWXYZ123456789';
const ID_LENGTH = 6;

function randomChar() {
  return CHAR[Math.floor(Math.random() * CHAR.length)];
}

function randomID() {
  let id = '';
  for (let i = 0; i < ID_LENGTH; i++) {
    id += randomChar();
  }
  return id;
}

let count = 0;

while (count < 1000000) {
  generate(15, 15);
  console.log(count);
  count++;
}
