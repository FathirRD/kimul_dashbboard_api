const Hapi = require('@hapi/hapi');
const { Pool } = require('pg');

const createServer = async (injections) => {
  const server = Hapi.server({
    host: process.env.HOST || 0.0.0.0,
    port: process.env.PORT || 5000,
  });

  server.route({
    method: 'GET',
    path: '/data',
    handler: async (request, h) => {
      const pool = new Pool();
      const query = await pool.query(`SELECT * FROM sensor_data LIMIT 10`);
      console.log(query);
      const result = query.rows;
      const response = h.response({
        status: 'success',
        message: 'data found',
        data: {
          result,
        },
      });
      response.code(200);

      return response;
    }
  });

  return server;
};

module.exports = createServer;
