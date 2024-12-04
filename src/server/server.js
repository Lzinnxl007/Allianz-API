import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fastifyMultipart from "@fastify/multipart";
import ProductsRoutes from "../modules/products/products.routes.js";

const server = fastify();
server.register(fastifyCors);
server.register(fastifyMultipart);

server.register(ProductsRoutes)


try {
    await server.listen({
        port: 3000,
    })
    console.log("Server running...")
} catch (error) {
    if(error instanceof Error) {
        console.log(error.message)
    }
    process.exit(1)
}
