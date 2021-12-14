import {readFile} from "fs/promises";

async function main() {
	const [template, ruleRaw] = (await readFile(`${__dirname}/inputs/14.txt`, "utf8")).trim().split("\n\n");
  const rules = Object.fromEntries(ruleRaw.split("\n").map(e => e.split(" -> "))) as {[key: string]: string};

  let pairCounts:{[key:string]: number} = {};
  for (let i = 0; i < template.length - 1; i++) {
    pairCounts[template.slice(i, i + 2)] = (pairCounts[template.slice(i, i + 2)] || 0) + 1;
  }
  let letterCounts:{[key:string]: number} = {};
  for (let letter of Object.values(rules)) {
    letterCounts[letter] = 0;
  }
  for (let letter of template) {
    letterCounts[letter] = (letterCounts[letter] || 0) + 1;
  }

  for (let i = 0; i < 40; i++) {
    const newPairCounts:{[key:string]: number} = {};
    for (let [pair, count] of Object.entries(pairCounts)) {
      letterCounts[rules[pair]] += count;
      newPairCounts[pair[0] + rules[pair]] = (newPairCounts[pair[0] + rules[pair]] || 0) + count;
      newPairCounts[rules[pair] + pair[1]] = (newPairCounts[rules[pair] + pair[1]] || 0) + count;
    }
    pairCounts = newPairCounts;
  }
  console.log(Math.max(...Object.values(letterCounts)) - Math.min(...Object.values(letterCounts)));
}main();