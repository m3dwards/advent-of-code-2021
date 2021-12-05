const fs = require('fs')

const input = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`;

let points = {};

function part1() {
  fs.readFile('day5.txt', 'utf8' , (err, datafile) => {
    var data = datafile.split(/\r?\n/);
    data = data.filter(item => item);
    data = data.map(item => item.split(" -> ").map(coord => coord.split(",").map(d => parseInt(d))));

    function addPoint(point) {
      if (point.toString() in points) {
        points[point.toString()]++;
        return;
      }
      points[point.toString()] = 1;
    }

    for (const line of data) {
      // vertical lines
        addPoint(line[0])
        addPoint(line[1])
      if (line[0][0] === line[1][0]) {
        // line goes up (decreasing y)
        if (line[0][1] > line[1][1]) {
            for (let i = 1; i < line[0][1] - line[1][1]; i++) {
              addPoint([line[1][0], line[1][1] + i]);
            }
        }
        // line goes down (increasing y)
        if (line[1][1] > line[0][1]) {
            for (let i = 1; i < line[1][1] - line[0][1]; i++) {
              addPoint([line[0][0], line[0][1] + i]);
            }
        }
      }

      // horizontal lines
      if (line[0][1] === line[1][1]) {
        // line goes left (decreasing x)
        if (line[0][0] > line[1][0]) {
            for (let i = 1; i < line[0][0] - line[1][0]; i++) {
              addPoint([line[1][0] + i, line[1][1]]);
            }
        }
        // line goes down (increasing y)
        if (line[1][0] > line[0][0]) {
            for (let i = 1; i < line[1][0] - line[0][0]; i++) {
              addPoint([line[0][0] + i, line[0][1]]);
            }
        }

      }

        // diagonal
        // line goes left up (decreasing x and y)
        if (line[0][0] > line[1][0] && line[0][1] > line[1][1]) {
            for (let i = 1; i < line[0][0] - line[1][0]; i++) {
              addPoint([line[1][0] + i, line[1][1] + i]);
            }
        }
        // line goes left down (decreasing x and increasing y)
        if (line[0][0] > line[1][0] && line[1][1] > line[0][1]) {
            for (let i = 1; i < line[0][0] - line[1][0]; i++) {
              addPoint([line[1][0] + i, line[1][1] - i]);
            }
        }
        // line goes right down (increasing x and increasing y)
        if (line[1][0] > line[0][0] && line[1][1] > line[0][1]) {
            for (let i = 1; i < line[1][0] - line[0][0]; i++) {
              addPoint([line[0][0] + i, line[0][1] + i]);
            }
        }

      // line goes right up (increasing x and decreasing y)
        if (line[1][0] > line[0][0] && line[0][1] > line[1][1]) {
            for (let i = 1; i < line[1][0] - line[0][0]; i++) {
              addPoint([line[0][0] + i, line[0][1] - i]);
            }
        }

    }

      // count points

      let total = 0;
      for (const key in points) {
        if (points[key] > 1) {
          total++;
          // total = total + points[key];
        }
      }

    console.log(points);
      console.log(total);

    // data = data.map(item => parseInt(item));

    // while(position < data.length) {
    //   dataWindow = data.slice(position, position + 3);
    //   total = dataWindow.reduce((a, b) => a + b, 0);
    //   if (previousSum && total > previousSum) {
    //     increasing++
    //   }
    //   previousSum = total;
    //   position = position + 1;
    // }
    // console.log("number increasing is: ");
    // console.log(increasing);
  })
}

part1();
