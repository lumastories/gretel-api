'use strict';

const Hapi = require('hapi');
var pg = require('pg');

pg.defaults.ssl = (process.env.NODE_ENV=='prod') ? true : false;

const server = new Hapi.Server();
server.connection({ port: process.env.PORT || 3000 });

server.register({ // register all your plugins
  register: require('hapi-postgres-connection') // no options required
}, function (err) {
  if (err) {
    // handle plugin startup error
  }
});

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
        var welcome = `Hello, ${encodeURIComponent(request.params.name)}!`;
        request.pg.client.query('SELECT * FROM participant;', function(err, result) {
          return reply(result.rows);
        })
    }
});

server.start((err) => {
    if (err) throw err;
    console.log(`Server running at: ${server.info.uri}`);
});
