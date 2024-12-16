import XBZController from "../../src/modules/XBZ/XBZ.controller.js"

export const handler = async (event, context) => {
    const data = await XBZController.ManipulateProducts()
  
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  };