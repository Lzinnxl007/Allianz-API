
import ProductsController from "./products.controller.js"

async function ProductsRoutes(app) {
    const routes = [
        {
            method: "POST",
            url: "/receive-products",
            handler: ProductsController.ReceiveProductsData
        }
    ]
    routes.forEach(route => app.route(route))
}

export default ProductsRoutes