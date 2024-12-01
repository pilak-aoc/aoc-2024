// Retrieve the data
const data = await fetchData();

// Parse data
const sets = data.split("\n").reduce(
  (acc, line) => {
    [item1, item2] = line.split(/ +/);

    acc.setA.push(item1);
    acc.setB.push(item2);

    return acc;
  },
  { setA: [], setB: [] }
);

// Sort both sets
sets.setA.sort();
sets.setB.sort();

// Sum the total distance
let result = 0;

for (let i = 0; i < sets.setA.length; i++) {
  result += Math.abs(sets.setA[i] - sets.setB[i]);
}

console.log("Total distance: ", result);

async function fetchData() {
  const url = "https://adventofcode.com/2024/day/1/input";

  const res = await fetch(url);

  return (await res.text()).trim();
}
