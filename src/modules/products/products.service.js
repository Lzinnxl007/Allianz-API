
class ProductsService {
  static async receiveProductsData(products) {
    const { SpotProducts, XbzProducts } =
      ProductsService.#separateProductsByProvider(products);

      return {
        SpotProducts,
        XbzProducts
      }
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

}

export default ProductsService;
