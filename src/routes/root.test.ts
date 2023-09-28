import { expect, test, afterAll } from "bun:test";
import { build, TestParam } from '../server.test';

test('default root route', async (t: TestParam) => {
  
  try {
    const app = await build()

    const res = await app.inject({
      url: '/'
    })

    expect(JSON.parse(res.payload)).toEqual({ root: true });
  } catch (e) {
    console.log(e);
    //throw e;
  }
});

// inject callback style:
//
// test('default root route', (t) => {
//   t.plan(2)
//   const app = await build(t)
//
//   app.inject({
//     url: '/'
//   }, (err, res) => {
//     t.error(err)
//     t.same(JSON.parse(res.payload), { root: true })
//   })
// })
