const fs = require('fs');
const path = require('path');
const parse = require('csv-parse/lib/sync');

const directoryPath = path.join(__dirname, 'data');

const files = fs.readdirSync(directoryPath);

const formatedDatas = [];

files.forEach(file => {
  const input = fs.readFileSync(path.join(directoryPath ,file));
  const output = parse(input, { delimiter: ',' });

  const rows = output.slice(2);

  const data = [];
  const formatedFile = [];

  rows.forEach(r => {
    data.push(r.slice(0, 4));
  });

  for (let i = 0; i < data.length; i++) {
    const result = {
      description: data[i][0].trim(),
      date: new Date(2019, 00, data[i][1], 7),
      cost: parseInt(data[i][2]),
      buyer: data[i][3],
      createdAt: new Date(2019, 00, data[i][1], 7),
      updatedAt: new Date(2019, 00, data[i][1], 7),
    };

    formatedFile.push(result);
  }

  formatedDatas.push(formatedFile);
})

module.exports = formatedDatas;
