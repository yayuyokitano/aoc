import {readFile} from "fs/promises";

async function main() {
	const oldCost = (await readFile(`${__dirname}/inputs/15.txt`, "utf8")).trim().split("\n").map(e => e.split("").map(Number));
  const cost = new Array(oldCost.length * 5).fill(0).map(e => new Array(oldCost[0].length * 5).fill(0));
  for (let i = 0; i < cost.length; i++) {
    for (let j = 0; j < cost[0].length; j++) {
      cost[i][j] = (oldCost[i % oldCost.length][j % oldCost[0].length] + Math.floor(i / oldCost.length) + Math.floor(j / oldCost[0].length));
      if (cost[i][j] > 9) {
        cost[i][j] -= 9;
      }
    }
  }
  let costMatrix = new Array(cost.length).fill(0).map(_ => new Array(cost[0].length).fill(0));
  costMatrix[0][0] = 0;
  
  for (let i = 1; i < cost.length; i++) {
    for (let j = 0; j <= i; j++) {
      costMatrix[i][j] = Math.min(costMatrix[i - 1][j], costMatrix[i][j - 1] ?? Infinity) + cost[i][j];
      costMatrix[j][i] = Math.min(costMatrix[j - 1]?.[i] ?? Infinity, costMatrix[j][i - 1]) + cost[j][i];
    }
  }

  let change = true;

  while (change) {
    change = false;
    for (let i = 0; i < costMatrix.length; i++) {
      for (let j = 0; j < costMatrix[0].length; j++) {
        const oldCost = costMatrix[i][j];
        costMatrix[i][j] = Math.min(costMatrix[i][j], (costMatrix[i + 1]?.[j] ?? Infinity) + cost[i][j], (costMatrix[i][j + 1] ?? Infinity) + cost[i][j], (costMatrix[i - 1]?.[j] ?? Infinity) + cost[i][j], (costMatrix[i][j - 1] ?? Infinity) + cost[i][j]);
        if (oldCost !== costMatrix[i][j]) {
          change = true;
        }
      }
    }
  }

  console.log(costMatrix[costMatrix.length - 1][costMatrix[0].length - 1]);
  

}main();