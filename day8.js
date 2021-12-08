const fs = require('fs')
// const testSingleLine = "acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf";
const testSingleLine = "edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc";
const testInput = `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`;

const segmentPositions = [
  [0, [1, 2, 3, 5, 6, 7]],
  [1, [3, 6]],
  [2, [1, 3, 4, 5, 7]],
  [3, [1, 3, 4, 6, 7]],
  [4, [2, 3, 4, 6]],
  [5, [1, 2, 4, 6, 7]],
  [6, [1, 2, 4, 5, 6, 7]],
  [7, [1, 3, 6]],
  [8, [1, 2, 3, 4, 5, 6, 7]],
  [9, [1, 2, 3, 4, 6, 7]]
];

const part2 = input => {
  // input = testSingleLine;
  const allValues = [1, 2, 3, 4, 5, 6, 7];
  const lines = input.split(/\r?\n/);
  let total = 0;
  for (lin of lines) {

    const possibleLetters = { a: [...allValues], b: [...allValues], c: [...allValues], d: [...allValues], e: [...allValues], f: [...allValues], g: [...allValues] };
    const signal = lin.split(" | ")[0].split(" ");
    const output = lin.split(" | ")[1].split(" ");

    for (display of signal) {
      possibleSegments = segmentPositions.filter(s => s[1].length === display.length).map(s => s[1]).flat();
      for (letter of display) {
        possibleLetters[letter] = possibleLetters[letter].filter(l => possibleSegments.includes(l));
      }

    }
    // let number1 = [];
    // for (key in possibleLetters) {
    //   if (possibleLetters[key].length === 2) {
    //     number1.push(key);
    //   }
    // }
    // //remove number 1
    // for (key in possibleLetters) {
    //   if (!number1.includes(key)) {
    //     possibleLetters[key] = possibleLetters[key].filter(l => !possibleLetters[number1[0]].includes(l) && !possibleLetters[number1[1]].includes(l))
    //   }
    // }

    // //remove any single numbers
    // let single = null;
    // for (key in possibleLetters) {
    //   if (possibleLetters[key].length === 1) {
    //     single = key;
    //     break;
    //   }
    // }
    // for (key in possibleLetters) {
    //   if (key !== single) {
    //     possibleLetters[key] = possibleLetters[key].filter(l => l !== possibleLetters[single][0]);
    //   }
    // }

    for (let i = 0; i < 10; i++) {
      let doubleNumbers = [];
      // remove double again
      for (key in possibleLetters) {
        if (possibleLetters[key].length === 2 || possibleLetters[key].length === 1) {
          doubleNumbers.push(...possibleLetters[key]);
        }
      }
      // remove
      for (key in possibleLetters) {
        if (possibleLetters[key].length > 2) {
          possibleLetters[key] = possibleLetters[key].filter(l => !doubleNumbers.includes(l));
        }
      }
    }


    let wordNumberMap = {};
    for (display of signal) {
      let possibleSeg = [];
      for (letter of display) {

        if (possibleLetters[letter].length === 2 &&
          (possibleSeg.filter(ps => ps.join() == possibleLetters[letter].join()).length > 0)) {
          possibleSeg = possibleSeg.filter(ps => ps.join() != possibleLetters[letter].join());
          possibleSeg.push([possibleLetters[letter][0]]);
          possibleSeg.push([possibleLetters[letter][1]]);
          continue;
        }
        possibleSeg.push(possibleLetters[letter]);
      }

      const knownNumbers = possibleSeg.filter(ps => ps.length == 1).flat();
      let wordGuess = segmentPositions.filter(sp => sp[1].length === display.length).filter(sp => knownNumbers.every(kn => sp[1].includes(kn)));
      // console.log(possibleSeg);
      wordNumberMap[display] = wordGuess[0][0];
      // console.log(wordGuess);
      // possibleSeg = possibleSeg.filter((value, index, self) => self.indexOf(value) === index);
      // console.log(display);
      // console.log(possibleSeg);
      // console.log(wordGuess);
    }

    console.log(wordNumberMap);

    let answer = "";
    for (out of output) {
      console.log(out);
      const sorted = [...out].sort().join("");
      for (key in wordNumberMap) {
        if ([...key].sort().join("") === sorted) {
          answer += wordNumberMap[key].toString();
          break;
        }
      }
    }

    total += parseInt(answer);
    // remove numbers
    console.log(parseInt(answer));
  }
  console.log(total);
};

const part1 = input => {
  const output = input.split(/\r?\n/).map(i => i.split(" | ")[1]).map(i => i.split(" ")).flat();
  const count = output.filter(o => [2, 3, 4, 7].includes(o.length)).length;
  console.log(count);
};

fs.readFile('day8.txt', 'utf8', (err, datafile) => {
  // part1(datafile);
  // part1(testInput);
  part2(datafile);
  // part2(testInput);
});