import SPOTController from "../SPOT/SPOT.controller.js";
import XBZController from "../XBZ/XBZ.controller.js";
import ProductsService from "./products.service.js";
import fs from "node:fs";
/* import cron from "node-cron"; */

class ProductsController {
  static async ReceiveProductsData(req) {
    const productsData = req.body;

    const { XbzProducts, SpotProducts } =
      await ProductsService.receiveProductsData(productsData);

    fs.writeFileSync("XBZData.json", JSON.stringify(XbzProducts, null, 2));
    fs.writeFileSync("SPOTData.json", JSON.stringify(SpotProducts, null, 2));

    SPOTController.ManipulateProducts(SpotProducts);
      XBZController.ManipulateProducts(XbzProducts);
   /*  cron.schedule("0 0 * * *", () => {
      
    }); */
  }
}

export default ProductsController;
