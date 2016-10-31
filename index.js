'use strict';

const Hapi = require('hapi');
const pg = require('pg');
pg.defaults.ssl = true;

const server = new Hapi.Server();
server.connection({ port: 3000 });

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply('Hello, world!');
  }
});

server.route({
  method: 'GET',
  path: '/{name}',
  handler: function (request, reply) {
    reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
  }
});

server.route({
  method: 'GET',
  path: '/db',
  handler: function (request, reply) {
    pg.connect(process.env.DATABASE_URL, function(err, client) {
      if (err) throw err;
      client.query('SELECT table_schema, table_name FROM information_schema.tables;')
      .on('row', function(row) {
        reply(JSON.stringify(row));
      });
    });
  }
});

server.start((err) => {
  if (err) throw err;
  console.log(`Server running at: ${server.info.uri}`);
});


