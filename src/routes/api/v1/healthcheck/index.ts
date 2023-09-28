import path from 'path';
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';


export default async function (fastify: FastifyInstance, _opts: never) {
  fastify.get('/', async function (_request: FastifyRequest, _reply: FastifyReply) {
    return 'ok';
  });
}

console.log(`${(__dirname).match('/routes/.*')??[0]} route loaded`);