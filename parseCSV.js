const fs = require('fs');
const parse = require('csv-parse/lib/sync');

const input = fs.readFileSync('./data/2019-01.csv');

const output = parse(input, { delimiter: ',' });

const formatedOutput = [];

for (let i = 0; i < output.length; i++) {
  const result = {
    description: output[i][0].trim(),
    date: new Date(2019, 00, output[i][1], 7),
    cost: parseInt(output[i][2]),
    buyer: output[i][3],
    createdAt: new Date(2019, 00, output[i][1], 7),
    updatedAt: new Date(2019, 00, output[i][1], 7),
  };

  formatedOutput.push(result);
}

module.exports = formatedOutput;