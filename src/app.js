const createServer = require('./createServer');
require('dotenv').config();

const start = async () => {
  const server = await createServer();
  await server.start();
  console.log(`server start at ${server.info.uri}`);
};

start();
