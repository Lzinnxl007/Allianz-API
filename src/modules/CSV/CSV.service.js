import fastCSV from "fast-csv"
import fs from "node:fs"

class CSVService {
    static createCSV(products) {
        const ws = fs.createWriteStream("SPOT.csv");
        fastCSV.write(products, { headers: true }).pipe(ws);
    }
}

export default CSVService