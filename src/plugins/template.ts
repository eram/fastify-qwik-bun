import path from 'path';
import fp from "fastify-plugin";
import { FastifyPluginAsync } from 'fastify';

/**
 * the use of fastify-plugin is required to be able
 * to export the decorators to the outer scope
 */

// using declaration merging, add your plugin props to the appropriate fastify interfaces
// if prop type is defined here, the value will be typechecked when you call decorate{,Request,Reply}
declare module 'fastify' {
  interface FastifyRequest {
    // myPluginProp: string
  }

  interface FastifyReply {
    // myPluginProp: number
  }
}

// define options
export interface Options {
  ret: string
}

const plugin: FastifyPluginAsync<Options> = async (fastify, opt = { ret: 'hugs' }) => {
  //fastify.decorateRequest('myPluginProp', 'super_secret_value')
  //fastify.decorateReply('myPluginProp', options.myPluginOption)
  fastify.decorate("hugs", function () {
    return opt.ret
  });
};

export default fp(plugin, '4.x');

console.log(`${path.parse(__filename).name} plugin loaded`);
