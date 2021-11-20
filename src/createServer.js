const Hapi = require('@hapi/hapi');
const { Pool } = require('pg');
require('dotenv').config();

const createServer = async (injections) => {
  const server = Hapi.server({
    host: process.env.HOST,
    port: process.env.PORT,
  });

  server.route({
    method: 'GET',
    path: '/data',
    handler: async (request, h) => {
      const pool = new Pool();
      const query = await pool.query(`SELECT * FROM sensor_data`);
      const result = query.rows;
      const response = h.response({
        status: 'success',
        message: 'data found',
        data: {
          result,
        },
      });
      response.code(200);

      console.log(response);
      return response;
    }
  });

  return server;
};

module.exports = createServer;
