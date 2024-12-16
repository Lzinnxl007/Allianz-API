import XBZService from "./XBZ.service.js";
import fs from "node:fs"

class XBZController {
    static async ManipulateProducts() {
        const file = fs.readFileSync("XBZData.json", "utf-8", (error) => {
            if(error) {
                console.log(error)
                return null
            }
        })
        const products = JSON.parse(file)
        const data = await XBZService.manipulateProducts(products)
        return data ?? []
    }
}

export default XBZController