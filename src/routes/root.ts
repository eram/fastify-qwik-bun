import path from 'path';
import { FastifyInstance, FastifyServerOptions } from 'fastify';
import fastifyStatic from '@fastify/static';

// on the root we delivery the public static site

export default async function (fastify: FastifyInstance, _opts: FastifyServerOptions) {
  await fastify.register(fastifyStatic, {
    root: path.join(__dirname, '../../public'),
    // prefix: '/public/', // optional: default '/'
    // constraints: { host: 'example.com' } // optional: default {}
  });
};

console.log(`${__dirname} route loaded`);