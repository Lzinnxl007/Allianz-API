import SPOTController from "../../src/modules/SPOT/SPOT.controller.js"

export const handler = async (event, context) => {
    const data = await SPOTController.ManipulateProducts()
  
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  };