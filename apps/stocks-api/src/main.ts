/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/
const Hapi = require('@hapi/hapi');
const axios = require('axios');
const CatboxMemory = require('@hapi/catbox-memory');
import { environment } from './environments/environment';
import { STOCK_API_CONST } from './app/constant/app-constant';

const SERVER_METHOD = async (symbol, period) => {
  try {
    const url = `${environment.apiUrl}/beta/stock/${symbol}/chart/${period}?token=${environment.apiKey}`;
    const response = await axios({
      method: STOCK_API_CONST.GET_METHOD,
      url: url
    });
    return response.data;
  } catch (error) {
    console.error("Error while featching response: ", error);
    return error;
  }
}

const init = async () => {
  const server = Hapi.server({
    port: 4300,
    cache: [
      {
        name: 'cache_data',
        provider: {
          constructor: CatboxMemory
        }
      }
    ],
    host: 'localhost',
    routes: {
      cors: true
    }
  });

  server.method('fetchStocks', SERVER_METHOD, 
  {
    cache: {
      cache: 'cache_data',
      expiresIn: 10 * 1000,
      generateTimeout: 20000,
      getDecoratedValue: true
    }
  });

  server.route({
    method: STOCK_API_CONST.GET_METHOD,
    path: STOCK_API_CONST.PATH,
    handler: async (request, h) => {
      const { symbol, period } = request.params;
      const { value, cached } = await server.methods.fetchStocks(symbol, period);
      const lastModified = cached ? new Date(cached.stored) : new Date();
      return h.response(value).header('Last-modified', lastModified.toUTCString());
    }
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
