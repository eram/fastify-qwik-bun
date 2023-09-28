import path from 'path';
import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';

/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-sensible
 */


// define options
export interface Options {
    errorHandler?: boolean
}


const plugin: FastifyPluginAsync<Options> = async (fastify, opt = {}) => {
  fastify.register(require('@fastify/sensible'), {
    errorHandler: !!opt.errorHandler
  });
};

export default fp(plugin, '4.x');

console.log(`${path.parse(__filename).name} plugin loaded`);