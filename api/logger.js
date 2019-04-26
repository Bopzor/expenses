import fs from 'fs-extra';

const logger = async (message, payload) => {
  try {
    const data = `[${new Date().toISOString()}][${message}] ${JSON.stringify(payload)}\n`;

    console.log(data);
    return await fs.writeFile('./logs/actions.log', data, { flag: 'a' });

  } catch (err) {
    console.log(err)
  }
};

module.exports = logger;
