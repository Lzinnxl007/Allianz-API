import ProductsService from "./products.service.js"
class ProductsController {
    static async ReceiveProductsData(req) {
        const productsData = req.body

        await ProductsService.receiveProductsData(productsData)

    }
}

export default ProductsController