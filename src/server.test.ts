import path from 'path';
import { expect, test, afterAll } from "bun:test";
import { build as buildApplication } from 'fastify-cli/helper';


test("2 + 2", () => {
  expect(2 + 2).toBe(4);
});

// fastify test helpers
// This file contains code that we reuse between our tests.

const AppPath = path.join(__dirname, '.', 'app.ts')

// Fill in this config with all the configurations
// needed for testing the application
export function config() {
  return {}
}

export type TestParam = (() => void | Promise<unknown>) | ((done: (err?: unknown) => void) => void);
export type AppType = ReturnType<typeof buildApplication>;


// automatically build and tear down our instance
export async function build(t?: TestParam): Promise<AppType> {
  // you can set all the options supported by the fastify CLI command
  const argv = [AppPath]

  // fastify-plugin ensures that all decorators
  // are exposed for testing purposes, this is
  // different from the production setup
  const app = await buildApplication(argv, config())

  // tear down our app after we are done
  afterAll(app.close.bind(app))

  return app
}
