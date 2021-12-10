const fs = require('fs')
const testInput = `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`;

const part2 = input => {
  const lines = input.split(/\r?\n/);
  const openings = ["<", "(", "[", "{"];
  const closings = ["}", "]", ")", ">"];
  const costs = {
    "(": 1,
    "[": 2,
    "{": 3,
    "<": 4
  };
  const alternatives = {
    ")": "(",
    "]": "[",
    "}": "{",
    ">": "<"
  };
  let cost = [];
  const newLines = [];
  for (const line of lines) {
    const symbols = [];
    newLines.push(line);
    for (const letter of line) {
      if (openings.includes(letter)) {
        symbols.push(letter);
        continue;
      }
      if (closings.includes(letter)) {
        if (symbols[symbols.length - 1] === alternatives[letter]) {
          symbols.pop();
          continue;
        }
        newLines.pop();
        break;
      }
    }
  }
  console.log(newLines);
  for (const line of newLines) {
    const symbols = [];
    let total = 0;
    for (let i = 0; i < line.length; i++) {
      const letter = line[i];
      if (openings.includes(letter)) {
        symbols.push(letter);
      }
      if (closings.includes(letter)) {
        symbols.pop();
      }
      if (i === line.length - 1) {

        for (const symbol of symbols.reverse()) {
          total = total * 5;
          total += costs[symbol];
        }
      }
    }
    cost.push(total);
  }
  const index = Math.floor(cost.length / 2);
  console.log(index);
  console.log(cost.sort((a, b) => a + b));
  console.log(cost.sort((a, b) => a - b)[Math.floor(cost.length / 2)]);
};

const part1 = input => {
  const lines = input.split(/\r?\n/);
  const openings = ["<", "(", "[", "{"];
  const closings = ["}", "]", ")", ">"];
  const costs = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137
  };
  const alternatives = {
    ")": "(",
    "]": "[",
    "}": "{",
    ">": "<"
  };
  let cost = 0;
  for (const line of lines) {
    const symbols = [];
    for (const letter of line) {
      if (openings.includes(letter)) {
        symbols.push(letter);
        continue;
      }
      if (closings.includes(letter)) {
        if (symbols[symbols.length - 1] === alternatives[letter]) {
          symbols.pop();
          continue;
        }
        cost += costs[letter];
        break;
      }
    }
  }
  console.log(cost);
};

fs.readFile('day10.txt', 'utf8', (err, datafile) => {
  // part1(datafile);
  // part1(testInput);
  part2(datafile);
  // part2(testInput);
});
