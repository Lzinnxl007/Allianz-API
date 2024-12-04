import CSVController from "../CSV/CSV.controller.js";

class ProductsService {
  static async receiveProductsData(products) {
    const { SpotProducts, XbzProducts } =
      ProductsService.#separateProductsByProvider(products);

    const SpotAllProducts = await ProductsService.#getSpotProducts()

    const spotCodes = SpotProducts.map((product) => product.codigo)

    const filteredSpotProducts = ProductsService.#filterSpotProducts(SpotAllProducts, spotCodes)

    CSVController.CreateCSV(filteredSpotProducts)

  }

  static #separateProductsByProvider(products) {
    const SpotProducts = products?.filter(
      (product) => product.fornecedor == "SPOT"
    );

    const XbzProducts = products?.filter(
      (product) => product.fornecedor == "XBZ"
    );

    return {
      SpotProducts,
      XbzProducts,
    };
  }

  static async #getXbzProducts() {
    const response = await fetch("");
  }

  static async #getSpotProducts() {
    try {
      const tokenResponse = await fetch(
        "http://ws.spotgifts.com.br/api/v1/authenticateclient?AccessKey=dtFAe3tlWao8Q3rO"
      );

      const data = await tokenResponse.json();
      const token = data["Token"];

      const productsResponse = await fetch(
        `http://ws.spotgifts.com.br/api/v1/productsTree?token=${token}&lang=PT`
      );

      const products = await productsResponse.json();

      return products.ProductsTree
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        return;
      }
    }
  }

  static #filterSpotProducts(products, codes) {
    const additionalData = products.map((product) => product.ProductOptionals)
    products.forEach((product, index) => {
        product.WebSku = additionalData[index][0].WebSku
    })

    return products.filter((product) => codes.includes(product.WebSku))

  }
}

export default ProductsService;
