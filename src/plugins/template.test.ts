import { expect, test } from "bun:test";
import Fastify from 'fastify';
import Support from './template';

test('support works standalone', async () => {
  const fastify = Fastify()
  fastify.register(Support, { ret: 'hugs' })

  await fastify.ready()
  expect(Object(fastify).hugs()).toEqual('hugs');
});

// You can also use plugin with opts in fastify v2
//
// test('support works standalone', (t) => {
//   t.plan(2)
//   const fastify = Fastify()
//   fastify.register(Support)
//
//   fastify.ready((err) => {
//     t.error(err)
//     t.equal(fastify.someSupport(), 'hugs')
//   })
// })
