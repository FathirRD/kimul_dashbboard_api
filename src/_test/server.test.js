const createServer = require('../createServer.js');

describe('api', () => {
  it('should respond with 200 and return list available data', async () => {
    // Arrange
    const server = await createServer();

    // Action
    const response = await server.inject({
      method: 'GET',
      url: '/data'
    });

    // Assert
    const responseJson = JSON.parse(response.payload);
    expect(response.statusCode).toEqual(200)
    expect(responseJson.status).toEqual('success');
    expect(responseJson.data).toBeDefined;
    expect(responseJson.data.query).toBeDefined;
  })
})
