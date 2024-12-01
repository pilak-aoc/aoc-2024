// Retrieve the data.
const data = await fetchData();

// Parse data.
const { left, right } = data.split("\n").reduce(
  (acc, line) => {
    [left, right] = line.split(/ +/);

    acc.left.push(left);
    acc.right.push(right);

    return acc;
  },
  { left: [], right: [] }
);

//#region "Part 1"

// Sort both sets
left.sort();
right.sort();

// Sum the total distance
let totalDistance = 0;

for (let i = 0; i < left.length; i++) {
  totalDistance += Math.abs(left[i] - right[i]);
}

console.log("Total distance: ", totalDistance);
//#endregion

//#region "Part 2"

// Cache the number of instances.
const instanceCache = {};

let totalSimilarityScore = 0;

for (let i = 0; i < left.length; i++) {
  const locationId = left[i];

  // Lookup from the cache.
  // If it doesn't exists, then calculate the value.
  let multiplier = instanceCache[locationId];
  if (multiplier === undefined) {
    multiplier = right.filter((locId) => locId === locationId).length;

    instanceCache[locationId] = multiplier;
  }

  totalSimilarityScore += locationId * multiplier;
}

console.log("Total similarity score: ", totalSimilarityScore);

//#endregion

async function fetchData() {
  const url = "https://adventofcode.com/2024/day/1/input";

  const res = await fetch(url);

  return (await res.text()).trim();
}
