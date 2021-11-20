const createServer = require('./createServer');

const start = async () => {
  const server = await createServer();
  await server.start();
  console.log(`server start at ${server.info.uri}`);
};

start();
