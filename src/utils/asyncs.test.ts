import { describe, test, expect, jest } from "bun:test";
import * as path from "path";
import { AsyncArray, afs, sleep } from "./asyncs";

describe("Async", async () => {
  test("AsyncArray.asyncForEach", async () => {

    const start = Date.now();
    const arr = new AsyncArray(1, 2);

    const fn = jest.fn(async (_item) => {
      await sleep(50);
    });

    // sleep in a row: 2*50 >= 100
    await arr.asyncForEach(fn);

    expect(Date.now() - start).toBeGreaterThanOrEqual(100);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  test("AsyncArray.asyncForAll", async () => {

    const start = Date.now();
    const arr = new AsyncArray(1, 2);

    const fn = jest.fn(async (_item) => {
      await sleep(50);
    });

    // sleep in parallel: >= 50
    await arr.asyncForAll(fn);

    expect(Date.now() - start).toBeGreaterThanOrEqual(50);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  test("rmRecursive", async () => {

    // build a folder structure and then delete it
    const dir1 = await afs.mkdtemp(`jest-${Date.now()}-`);
    const f1 = path.join(dir1, "file1");
    await afs.writeFile(f1, "data1");
    await afs.mkdir(path.join(dir1, "dir2"));
    const f2 = path.join(dir1, "dir2", "file2");
    await afs.writeFile(f2, "data2");

    await expect(afs.exists(f2)).resolves.toBeTruthy();

    let i=0;
    const cnt = async (_dirent: unknown) => {
      i++;
      console.log(i, _dirent);
    }

    await afs.dirIterate(dir1, cnt);
    expect(i).toEqual(5);

    await afs.rmRecursive(dir1);

    await expect(afs.exists(f2)).resolves.toBeFalsy();
    await expect(afs.exists(dir1)).resolves.toBeFalsy();
  });

});
