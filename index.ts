import path from "node:path";
// import { ruto } from "ruto/dist";
import Fastify from "fastify";
import autoload from "@fastify/autoload";
import { fileURLToPath } from "url";

(async () => {
  const fastify = await Fastify({
    logger: true,
  });

  // await fastify.register(ruto, {
  // routesPath: path.join(__dirname, "routes"),
  // });

  // @ts-ignore
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  fastify.register(autoload, {
    dir: path.join(__dirname, "routes"),
  });

  fastify.printRoutes();
  fastify.printPlugins();

  fastify.listen({ port: 3333 }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    console.log(`Server listening on ${address}`);
  });
})();
