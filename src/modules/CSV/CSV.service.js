import fastCSV from "fast-csv"
import fs from "node:fs"

class CSVService {
    static createCSV(products, name) {
        const ws = fs.createWriteStream(`${name}.csv`);
        fastCSV.write(products, { headers: true }).pipe(ws);
        console.log(`File ${name}.csv created!`)
    }
}

export default CSVService