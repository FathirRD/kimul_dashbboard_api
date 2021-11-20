const Hapi = require('@hapi/hapi');

const createServer = async (injections) => {
  const server = Hapi.server({
    host: process.env.HOST,
    port: process.env.PORT,
  });

  await server.register([
    {
      plugin: require('hapi-plugin-mysql'),
      options: {
          host: process.env.DBHOST,
          user: process.env.DBUSER,
          password: process.env.DBPASSWORD,
          database: process.env.DBNAME,
          insecureAuth : true
      },
    },
  ]);

  server.route({
    method: 'GET',
    path: '/data',
    handler: async (request, h) => {
      const query = await request.app.db.query(`SELECT * FROM sensor`);
      const response = h.response({
        status: 'success',
        message: 'data found',
        data: {
          query,
        },
      });
      response.code(200);

      return response;
    }
  });

  return server;
};

module.exports = createServer;
