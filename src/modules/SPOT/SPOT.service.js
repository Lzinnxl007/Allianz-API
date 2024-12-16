

class SPOTService {
  static async manipulateProducts(products) {
    const token = await SPOTService.getToken()

    const SPOTAllProducts = await SPOTService.getSpotProducts(token);
    const productsStock = await SPOTService.getStock(token)

    SPOTAllProducts?.forEach((product, index) => {
      product.stock = productsStock?.[index].Quantity
    })

    const SPOTCodes = products?.map((product) => product.codigo);

    const filteredSPOTProducts = SPOTService.filterSpotProducts(
      SPOTAllProducts,
      SPOTCodes
    );

    return filteredSPOTProducts
    
  }

  static async getToken() {
    try {
      const tokenResponse = await fetch(
        "http://ws.spotgifts.com.br/api/v1/authenticateclient?AccessKey=dtFAe3tlWao8Q3rO"
      );

      const data = await tokenResponse.json();
      const token = data["Token"];
      return token;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return;
    }
  }
  static async getSpotProducts(token) {
    try {
      const productsResponse = await fetch(
        `http://ws.spotgifts.com.br/api/v1/productsTree?token=${token}&lang=PT`
      );

      const products = await productsResponse.json();

      return products.ProductsTree;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return;
    }
  }

  static async getStock(token) {
    try {
      const response = await fetch(
        `http://ws.spotgifts.com.br/api/v1/stocks?token=${token}&lang=PT`
      );
      const stock = await response.json();
      return stock.Stocks;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return;
    }
  }

  static filterSpotProducts(products, codes) {
    const additionalData = products.map((product) => product.ProductOptionals);
    products.forEach((product, index) => {
      product.WebSku = additionalData[index][0].WebSku;
      product.MainImage = `https://www.spotgifts.com.br/fotos/produtos/${product.MainImage}`;
      product.Colors = product.ProductOptionals.map((optional) => optional.ColorDesc1).join(" | ")
      product.Price = product?.ScalePrices?.[0]?.Price
      const imageList = product?.AllImageList?.split(",");
      if (imageList.length > 4) {
        imageList.length = 4;
      }
      const newImages = imageList?.map((url) => {
        return `https://www.spotgifts.com.br/fotos/produtos/${url?.replace(
          /\s+/g,
          ""
        )}`;
      });
      product.AllImageList = newImages.join() ?? "";
    });

    return products.filter((product) => codes.includes(product.WebSku));
  }
}

export default SPOTService;
