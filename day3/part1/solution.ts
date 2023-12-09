import * as fs from "fs";
import * as path from "path";
const filePath = path.resolve(__dirname, "../../data.txt");
let data = fs.readFileSync(filePath, { encoding: "utf8" }).split("\n");
console.log(data,' data');
