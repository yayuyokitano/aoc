import process from "process";
import {readFile} from "fs/promises";

async function main() {
	const day = process.argv[2];
	const fileContent = await readFile(`${__dirname}/answers/${day}.js`);
	eval(fileContent.toString())
}main();