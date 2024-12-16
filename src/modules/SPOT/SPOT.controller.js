import SPOTService from "./SPOT.service.js";
import fs from "node:fs"

class SPOTController {
  static async ManipulateProducts() {
    const file = fs.readFileSync("SPOTData.json", "utf-8", (error) => {
      if (error) {
        console.log(error);
        return null;
      }
    });
    const products = JSON.parse(file);
    return await SPOTService.manipulateProducts(products);
  }
}

export default SPOTController;
