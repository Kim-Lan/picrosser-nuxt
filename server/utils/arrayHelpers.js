export function printArray(array) {
  if (array === undefined) return;

  let string = '[';
  const length = array.length;
  for (let i = 0; i < length - 1; i++) {
      string += array[i] + ',';
  }
  string += array[length - 1] + ']';
  console.log(string);
}

export function arraySum(arr) {
  const numArray = Array.from(arr, Number);
  return numArray.reduce((a, b) => a + b, 0);
}

export function fillArray(arr, value) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = value;
  }
}

export function range(x) {
  if (typeof x === 'number') {
      const n = Math.abs(Math.round(x));
      const result = [];
      for (let i = 0; i < n; i++) {
          result.push(i);
      }
      return result;
  }
  return undefined;
}

export function minArray(arr) {
  let min = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < min) {
      min = arr[i];
    }
  }
  return min;
}

export function maxArray(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}
