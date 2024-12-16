var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// .netlify/functions-internal/spot.js
var spot_exports = {};
__export(spot_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(spot_exports);

// src/modules/SPOT/SPOT.service.js
var SPOTService = class _SPOTService {
  static async manipulateProducts(products) {
    const token = await _SPOTService.getToken();
    const SPOTAllProducts = await _SPOTService.getSpotProducts(token);
    const productsStock = await _SPOTService.getStock(token);
    SPOTAllProducts?.forEach((product, index) => {
      product.stock = productsStock?.[index].Quantity;
    });
    const SPOTCodes = products?.map((product) => product.codigo);
    const filteredSPOTProducts = _SPOTService.filterSpotProducts(
      SPOTAllProducts,
      SPOTCodes
    );
    return filteredSPOTProducts;
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
      product.Colors = product.ProductOptionals.map((optional) => optional.ColorDesc1).join(" | ");
      product.Price = product?.ScalePrices?.[0]?.Price;
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
};
var SPOT_service_default = SPOTService;

// src/modules/SPOT/SPOT.controller.js
var import_node_fs = __toESM(require("fs"), 1);
var SPOTController = class {
  static async ManipulateProducts() {
    const file = import_node_fs.default.readFileSync("SPOTData.json", "utf-8", (error) => {
      if (error) {
        console.log(error);
        return null;
      }
    });
    const products = JSON.parse(file);
    const data = await SPOT_service_default.manipulateProducts(products);
    return data ?? [];
  }
};
var SPOT_controller_default = SPOTController;

// .netlify/functions-internal/spot.js
var handler = async (event, context) => {
  const data = await SPOT_controller_default.ManipulateProducts();
  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
//# sourceMappingURL=spot.js.map
