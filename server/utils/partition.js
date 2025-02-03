import { rando } from '@nastyox/rando.js';

export function partition(sum, len, min, max) {
  const a = Array(len).fill(min);
  while (a.reduce((acc,val)=>acc+val) < sum) {
      const i = Math.floor(rando() * len);
      if (a[i] < max) a[i]++;
  }
  return a;
}
