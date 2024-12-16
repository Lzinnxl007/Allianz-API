import CSVController from "../CSV/CSV.controller.js";

class XBZService {
  static async manipulateProducts(products) {
    const XBZAllProducts = await XBZService.#getXbzProducts();

    const XBZCodes = products.map((product) => product.codigo);
    const XBZCategories = products.map((product) => product.categoria);

    const filteredXBZProducts = XBZService.#filterXBZProducts(
      XBZAllProducts,
      XBZCodes
    );

    const productsWithCategories = XBZService.#addCategory(
      filteredXBZProducts,
      XBZCategories
    );

    const updatedProducts = XBZService.#addProductType(productsWithCategories);

    /* const groupedProducts = XBZService.#filterProductsBySKU(
      updatedProducts
    ); */

    //CSVController.CreateCSV(updatedProducts, "XBZ");

    return updatedProducts;
  }

  static async #getXbzProducts() {
    try {
      const response = await fetch(
        "https://api.minhaxbz.com.br:5001/api/clientes/GetListaDeProdutos?cnpj=48497996000119&token=XF88B9861C"
      );
      const products = await response.json();
      return products;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return error;
    }
  }

  static #filterXBZProducts(products, codes) {
    const filteredProducts = products.filter((product) => {
      if (
        codes.includes(product.CodigoComposto) ||
        codes.includes(product.CodigoAmigavel)
      ) {
        return product;
      }
    });
    return filteredProducts;
  }

  static #addCategory(products, categories) {
    products.forEach((product, index) => {
      product.Categoria = categories[index];
    });

    return products;
  }

  static #addProductType(products) {
    const updatedProducts = products.map((product) => {
      const isVariable =
        products.filter((p) => p.CodigoComposto === product.CodigoComposto)
          .length > 1;
      return {
        ...product,
        Tipo: isVariable ? "variable" : "simple",
      };
    });
    console.log(updatedProducts);
    return updatedProducts;
  }

  static #filterProductsBySKU(products) {
    const groupedProducts = products.reduce((acc, product) => {
      const { CodigoAmigavel, CorWebPrincipal, QuantidadeDisponivel, ...rest } =
        product;

      if (!acc[CodigoAmigavel]) {
        acc[CodigoAmigavel] = {
          CodigoAmigavel,
          QuantidadeDisponivel,
          CorWebPrincipal: [],
          ...rest,
        };
      }

      acc[CodigoAmigavel].QuantidadeDisponivel = QuantidadeDisponivel;
      acc[CodigoAmigavel].CorWebPrincipal.push(CorWebPrincipal);
      return acc;
    }, {});

    const result = Object.values(groupedProducts).map((group) => ({
      ...group,
      Cores: group.CorWebPrincipal.join(" | "),
      QuantidadeDisponivel: group.QuantidadeDisponivel,
      Tipo: group.CorWebPrincipal.length > 1 ? "variable" : "simple",
    }));
    return result;
  }
}

export default XBZService;
