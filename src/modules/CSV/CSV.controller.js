import CSVService from "./CSV.service.js"

class CSVController {
    static CreateCSV(products, name) {
        CSVService.createCSV(products, name)
    }
}

export default CSVController