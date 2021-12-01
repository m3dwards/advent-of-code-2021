const fs = require('fs')

function howManyIncreasing(data) {
  increasing = 0;
  position = 0;
  previousSum = null;

  fs.readFile('data.txt', 'utf8' , (err, datafile) => {
    var data = datafile.split(/\r?\n/);
    data = data.map(item => parseInt(item));

    while(position < data.length) {
      dataWindow = data.slice(position, position + 3);
      total = dataWindow.reduce((a, b) => a + b, 0);
      if (previousSum && total > previousSum) {
        increasing++
      }
      previousSum = total;
      position = position + 1;
    }
    console.log("number increasing is: ");
    console.log(increasing);
  })

};

howManyIncreasing();
