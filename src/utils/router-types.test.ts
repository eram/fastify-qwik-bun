// this is just a playground for schema creation based on typescript types.
// adapted from https://github.com/vega/ts-json-schema-generator/blob/next/test/vega-lite.test.ts
import { describe, test, expect } from "bun:test";
import { resolve } from "path";
import { Config, createGenerator } from "ts-json-schema-generator";
import { afs, atTerminate } from "./";

describe("routes-types", () => {
  test("schema generator", async () => {
    const config: Config = {
      path: `${__dirname}/__mocks__/router-types.d.ts`,
      type: "StatusCode",
      encodeRefs: false,
      skipTypeCheck: true,
    };

    expect(await afs.exists(resolve(config.path || ""))).toEqual(true);

    const generator = createGenerator(config);
    const schema = generator.createSchema(config.type);
    const schemaFile = resolve(`${__dirname}/__mocks__/router-types.schema`);

    //if (process.env.UPDATE_SCHEMA) {
      atTerminate(() => { afs.unlink(schemaFile) });
      await afs.writeFile(schemaFile, JSON.stringify(schema, null, 2) + "\n", "utf8");
    //}

    //const vegaLiteSchema = JSON.parse(readFileSync(schemaFile, "utf8"));

    expect(schema.uniqueItems).toEqual(1);
  });
});

/*
import { StatusCode, FastifyError, Operation } from "./router-schema";
import { property, arrayProperty, objectOptions, getJSONSchema } from 'type-schema';

type JsonSchema<T> =
  T extends object ? { type: 'object', properties: { [K in keyof T]: JsonSchema<T[K]> } } :
  T extends string ? { type: 'string' } :
  T extends number ? { type: 'number' } :
  T extends boolean ? { type: 'boolean' } :
  never


describe("schema generation tests", () => {

  test("basic", () => {

    type SchemaType = JsonSchema<{
      x: number,
      y: number,
      z: number
    }>;

    type ExpectedType = {
      type: 'object';
      properties: {
        x: {
          type: 'number';
        };
        y: {
          type: 'number';
        };
        z: {
          type: 'number';
        };
      };
    };

    class Schema extends SchemaType { type: never; properties: never; }
    const c = new Schema();
    class Expected implements ExpectedType { type: never; properties: never; }

    expect(JSON.stringify(new Schema())).toEqual(JSON.stringify(new Expected));
  });

  test("router-types", () => {

    const schema1 = getJSONSchema(FastifyError);

    const expected1 =
    {
      type: "object",
      properties: {
        code: { type: "string" },
        name: { type: "string" },
        message: { type: "string" },
        stack: { type: "string" },
        statusCode: { type: "number" }
      },
      required: ["code", "name", "message"]
    };

    expect(JSON.stringify(schema1)).toEqual(JSON.stringify(expected1));

    const schema2 = getJSONSchema(Operation);

    const expected2 =
    {
      type: "object",
      properties: {
      }
    };

    expect(schema2).toEqual(expected2);

  });

  //test("enum types")

});
*/