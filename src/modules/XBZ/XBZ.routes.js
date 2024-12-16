import XBZController from "./XBZ.controller.js"

async function XBZRoutes(app) {
    const routes = [
        {
            method: "GET",
            url: "/xbz",
            handler: XBZController.ManipulateProducts
        },
    ]
    routes.forEach(route => app.route(route))
}

export default XBZRoutes