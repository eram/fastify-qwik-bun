import { expect, test } from "bun:test";
import { build, TestParam } from '../../../../server.test';

test('example is loaded', async (t: TestParam) => {
  const app = await build(t)

  const res = await app.inject({
    url: '/example'
  });

  expect(res.payload).toEqual('ok')
})

// inject callback style:
//
// test('example is loaded', (t) => {
//   t.plan(2)
//   const app = await build(t)
//
//   app.inject({
//     url: '/example'
//   }, (err, res) => {
//     t.error(err)
//     t.equal(res.payload, 'this is an example')
//   })
// })
