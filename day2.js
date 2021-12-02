const fs = require('fs')

function part1() {
  horizontalPosition = 0;
  depth = 0;

  fs.readFile('day2.txt', 'utf8' , (err, datafile) => {
    var data = datafile.split(/\r?\n/);
    data = data.map(item => item.split(" "));
    data = data.map(item => [item[0], parseInt(item[1])]);

    data.forEach(instruction => {
      console.log(instruction)
      if (instruction[0] === "forward") {
        horizontalPosition += instruction[1];
      }
      if (instruction[0] === "down") {
        depth += instruction[1];
      }
      if (instruction[0] === "up") {
        depth -= instruction[1];
      }
    });

    console.log("Horizontal position is: ", horizontalPosition);
    console.log("Depth is: ", depth);
    console.log("Multiplied equals: ", horizontalPosition * depth);
  })

};

// part1();

function part2() {
  horizontalPosition = 0;
  depth = 0;
  aim = 0;

  fs.readFile('day2.txt', 'utf8' , (err, datafile) => {
    var data = datafile.split(/\r?\n/);
    data = data.map(item => item.split(" "));
    data = data.map(item => [item[0], parseInt(item[1])]);

    data.forEach(instruction => {
      console.log(instruction)
      if (instruction[0] === "forward") {
        horizontalPosition += instruction[1];

        depth += aim * instruction[1];
      }
      if (instruction[0] === "down") {
        aim += instruction[1];
      }
      if (instruction[0] === "up") {
        aim -= instruction[1];
      }
    });

    console.log("Horizontal position is: ", horizontalPosition);
    console.log("Depth is: ", depth);
    console.log("Aim is: ", aim);
    console.log("Multiplied equals: ", horizontalPosition * depth);
  })

};

part2();
