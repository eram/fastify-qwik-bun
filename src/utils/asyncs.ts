import * as _fs from "fs";
import { promisify } from "util";
import * as path from "path";


export class AsyncArray<T> extends Array<T> {
  async asyncForEach(callback: (item: T, index: number) => Promise<void>) {
    for (let index = 0; index < this.length; index++) {
      await callback(this[index], index);     // eslint-disable-line
    }
  }

  async asyncForAll(callback: (item: T, index: number) => Promise<void>) {
    await Promise.all(this.map(callback));
  }
}

// recursive iterate directory, files first
type DirIterate = (folder: string | _fs.Dirent, cb: (dirent: _fs.Dirent) => Promise<void>) => Promise<void>;
const dirIterate: DirIterate = async (name, cb) => {
  // @ ts-expect-error
  //TODO: is this name exists?
  const dirent = (typeof name === "string") ? (new Object({ name, path: ""})) as _fs.Dirent : name;
  console.log("dirIterate:", dirent);
  const entries = new AsyncArray<_fs.Dirent>();
  entries.concat(await afs.readdir(dirent.name, { withFileTypes: true }));
  console.log("dirIterate enties:", entries.length);
  await entries.asyncForEach(async (entry) => {
    entry.name = path.join(dirent.name, entry.name);
    if (entry.isDirectory()) {
      await afs.dirIterate(entry, cb);
    } else {
      await cb(entry);
    }
  });
  await cb(dirent);
};

// this is just an override of the 'fs' functions to make them async
export const afs = {
  ..._fs.promises,
  ..._fs.constants,
  Stats: _fs.Stats,                     // eslint-disable-line
  Dirent: _fs.Dirent,                   // eslint-disable-line
  exists: promisify(_fs.exists),
  dirIterate,
  // recursive remove directory
  rmRecursive: async (folder: string) => { return afs.rm(folder, { recursive: true, force: true }); }
};

export const sleep = async (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

