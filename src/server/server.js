import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fastifyMultipart from "@fastify/multipart";
import ProductsRoutes from "../modules/products/products.routes.js";
import XBZRoutes from "../modules/XBZ/XBZ.routes.js";
import SPOTRoutes from "../modules/SPOT/SPOT.routes.js";

const server = fastify();
server.register(fastifyCors);
server.register(fastifyMultipart);

server.register(ProductsRoutes);
server.register(XBZRoutes);
server.register(SPOTRoutes);

server.get("hello", () => {
  return "Hello World"
})

try {
  await server.listen({
    port: 3000
  })
  console.log("Server running...")
} catch (error) {
  console.log(error)
  process.exit(1)
}

/* export default async (req, res) => {
  await fastify.ready();
  fastify.server.emit("request", req, res);
}; */
