'use strict';

const Hapi = require('hapi');
// var pg = require('pg');
const AuthBearer = require('hapi-auth-bearer-token');

// pg.defaults.ssl = (process.env.NODE_ENV=='prod') ? true : false;

const server = new Hapi.Server();
server.connection({ port: process.env.PORT || 3000 });

// server.register({ // register all your plugins
//   register: require('hapi-postgres-connection') // no options required
// }, function (err) {
//   if (err) {
//     // handle plugin startup error
//   }
// });

server.register(AuthBearer, (err) => {

    server.auth.strategy('simple', 'bearer-access-token', {
        allowQueryToken: true,              // optional, true by default
        allowMultipleHeaders: false,        // optional, false by default
        accessTokenName: 'access_token',    // optional, 'access_token' by default
        validateFunc: function (token, callback) {

            // For convenience, the request object can be accessed
            // from `this` within validateFunc.
            var request = this;

            // Use a real strategy here,
            // comparing with a token from your database for example
            if (token === "1234") {
                return callback(null, true, { token: token }, { artifact1: 'an artifact' });
            }

            return callback(null, false, { token: token }, { artifact1: 'an artifact' });
        }
    });

    server.route({
        method: 'GET',
        path: '/',
        config: {
           auth: 'simple',
           handler: function (request, reply) {

              return reply('success');
           }
        }
    });

    server.route({
        method: 'GET',
        path: '/{name}',
        handler: function (request, reply) {
            var welcome = `Hello, ${encodeURIComponent(request.params.name)}!`;
            return rply(welcome);
            // request.pg.client.query('SELECT * FROM participant;', function(err, result) {
            //   return reply(result.rows);
            // })
        }
    });

    server.start((err) => {

        if (err) {
          throw err;
        }
        console.log('Server started at: ' + server.info.uri);
    })
});



