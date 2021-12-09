const fs = require('fs')
const testInput = `2199943210
3987894921
9856789892
8767896789
9899965678`;

const getLowPointIndexes = (input, dataWidth) => {
  let lowPoints = [];
  for (let i = 0; i < input.length; i++) {
    const number = parseInt(input[i]);
    const left = (i % dataWidth === 0) ? 10 : parseInt(input[i - 1]);
    const right = ((i + 1) % dataWidth === 0) ? 10 : parseInt(input[i + 1]);
    const up = parseInt(input[i - dataWidth] ?? 10);
    const down = parseInt(input[i + dataWidth] ?? 10);

    if (number < left && number < right && number < up && number < down) {
      lowPoints.push(i);
    }
  }
  return lowPoints;
};

let depth = 0;
let visited = [];


const findNeighbours = (entryDirection, index, input, dataWidth) => {
  if (visited.includes(index))
    return 0;
  visited.push(index);

  if (parseInt(input[index]) === 9) {
    return 0;
  }
  let total = 1;

  const leftIndex = (index % dataWidth === 0) ? false : index - 1;
  const rightIndex = ((index + 1) % dataWidth === 0) ? false : index + 1;
  const upIndex = index - dataWidth < 0 ? false : index - dataWidth;
  const downIndex = index + dataWidth >= input.length ? false : index + dataWidth;

  if (upIndex !== false && entryDirection !== "down")
    total += findNeighbours("up", upIndex, input, dataWidth);
  if (downIndex !== false && entryDirection !== "up")
    total += findNeighbours("down", downIndex, input, dataWidth);
  if (leftIndex !== false && entryDirection !== "right")
    total += findNeighbours("left", leftIndex, input, dataWidth);
  if (rightIndex !== false && entryDirection !== "left")
    total += findNeighbours("right", rightIndex, input, dataWidth);

  return total;
};

const part2 = input => {
  const dataWidth = input.indexOf("\n");
  input = input.replaceAll('\n', '');
  const lowPoints = getLowPointIndexes(input, dataWidth);
  const basins = [];
  for (const lowPoint of lowPoints) {
    basins.push(findNeighbours(null, lowPoint, input, dataWidth));
  }
  const answer = basins.sort((a, b) => b - a).slice(0, 3).reduce((a, b) => a * b, 1);
  console.log(answer);
};

const part1 = input => {
  const dataWidth = input.indexOf("\n");
  input = input.replaceAll('\n', '');

  let lowPoints = [];
  for (let i = 0; i < input.length; i++) {
    const number = parseInt(input[i]);
    const left = (i % dataWidth === 0) ? 10 : parseInt(input[i - 1]);
    const right = ((i + 1) % dataWidth === 0) ? 10 : parseInt(input[i + 1]);
    const up = parseInt(input[i - dataWidth] ?? 10);
    const down = parseInt(input[i + dataWidth] ?? 10);

    if (number < left && number < right && number < up && number < down) {
      lowPoints.push(parseInt(input[i]));
    }
  }
  console.log(lowPoints.reduce((a, b) => a + parseInt(b) + 1, 0));
};

fs.readFile('day9.txt', 'utf8', (err, datafile) => {
  // part1(datafile);
  // part1(testInput);
  part2(datafile);
  // part2(testInput);
});
