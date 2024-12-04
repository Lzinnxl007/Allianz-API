import CSVService from "./CSV.service.js"

class CSVController {
    static CreateCSV(products) {
        CSVService.createCSV(products)
    }
}

export default CSVController