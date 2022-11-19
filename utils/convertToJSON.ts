const fs = require('fs');
const Path = require('path');

async function readNonDir(path: string) {
  try {
    const dir = fs.opendirSync(path);
    for await (const dirent of dir) {
      if (dirent.isFile()) {
        const base = dirent.name;
        const filepath = path + '/' + base;
        const filename = Path.parse(base).name;
        const data = fs.readFileSync(filepath, { encoding: 'utf-8' });
        const obj = parseNon(filename, data);
        writeToJSON(path, filename, obj);
        fs.renameSync(filepath, path + '/converted/' + base);
        console.log('converted ' + base);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

function parseNon(filename: string, data: string): object {
  const lines = data.split('\n');

  let width = 0;
  let height = 0;
  const rowKeys = []; const colKeys = [];
  let goal = '';

  for (let i = 0; i < lines.length; i++) {
    const words = lines[i].split(' ');
    if (lines[i].startsWith('width')) {
      width = Number(words[1]);
    } else if (lines[i].startsWith('height')) {
      height = Number(words[1]);
    } else if (lines[i] === 'rows') {
      do {
        i++;
        const keys = lines[i].split(',');
        rowKeys.push(keys);
      } while (lines[i + 1] !== '');
    } else if (lines[i] === 'columns') {
      do {
        i++;
        const keys = lines[i].split(',');
        colKeys.push(keys);
      } while (lines[i + 1] !== '');
    } else if (lines[i].startsWith('goal')) {
      goal = words[1].replace(/"/g, '');
    }
  }
  console.log('row keys length ' + rowKeys.length);
  console.log('col keys length ' + colKeys.length);
  console.log('goal ' + goal);
  return {
    id: filename,
    width,
    height,
    rowKeys,
    colKeys,
    goal
  }
}

function writeToJSON(path: string, name: string, obj: object) {
  fs.writeFileSync(path + '/JSON/' + name + '.json', JSON.stringify(obj));
}

readNonDir('non');
