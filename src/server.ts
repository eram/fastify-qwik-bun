import path from "path";
import AutoLoad from '@fastify/autoload';
import Fastify, { FastifyServerOptions, FastifyListenOptions, FastifyError } from 'fastify';

// Pass --options via CLI arguments in command to enable these options.
export let options: FastifyServerOptions = {
  logger: true,
};

// main server loop
export async function main (){

  const fastify = Fastify(options);

  // Place here your custom code!

  
  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, options),
    ignorePattern: /^.*\.(test|spec)\..*(s|sx)$/
  });


  // This loads all plugins defined in routes with route params
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    routeParams: true,
    options: Object.assign({}, options),
    ignorePattern: /^.*\.(test|spec)\..*(s|sx)$/
  });

  await fastify.ready();
  console.log('loaded plugins:', fastify.printPlugins());
  console.log('loaded routes:', fastify.printRoutes());

  const opts: FastifyListenOptions = {
    port: Number(process.env.PORT || 8080),
    host: String(process.env.HOST || '127.0.0.1')
  };

  fastify.listen(opts, (err: Error | null, address: string) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    console.log(`Server listening at ${address}`);
  });

}

