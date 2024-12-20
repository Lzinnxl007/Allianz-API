import SPOTController from "./SPOT.controller.js"


async function SPOTRoutes(app) {
    const routes = [
        {
            method: "GET",
            url: "/spot",
            handler: SPOTController.ManipulateProducts
        }
    ]
    routes.forEach(route => app.route(route))
}

export default SPOTRoutes