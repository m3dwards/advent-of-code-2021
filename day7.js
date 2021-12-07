const { input } = require("./day7input.js");
const testInput = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14];

const calcMedian = arr => {
  let middle = Math.floor(arr.length / 2);
  arr = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? arr[middle] : (arr[middle - 1] + arr[middle]) / 2;
};

function main(input) {
  const median = calcMedian(input);
  const mean = Math.floor(input.reduce((a, b) => a + b) / input.length);
  const difference = input.reduce((a, b) => a + Math.abs(b - median), 0);
  const differenceMean = input.reduce((a, b, i) => a + (Math.abs(b - mean) / 2) * (1 + Math.abs(b - mean)), 0);
  console.log(difference);
  console.log(differenceMean);
}

function part2(input) {
  const mean = Math.floor(input.reduce((a, b) => a + b) / input.length);
  const difference = input.reduce((a, b, i) => a + (Math.abs(b - mean) / 2) * (1 + Math.abs(b - mean)), 0);
  console.log(difference);
}

main(input);
// main(testInput);
