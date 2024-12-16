import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fastifyMultipart from "@fastify/multipart";
import ProductsRoutes from "../src/modules/products/products.routes.js";
import XBZRoutes from "../src/modules/XBZ/XBZ.routes.js";
import SPOTRoutes from "../src/modules/SPOT/SPOT.routes.js";

const server = fastify();
server.register(fastifyCors);
server.register(fastifyMultipart);

server.register(ProductsRoutes);
server.register(XBZRoutes);
server.register(SPOTRoutes);

export default async (req, res) => {
  await fastify.ready();
  fastify.server.emit("request", req, res);
};
