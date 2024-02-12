const fs = require("fs");
const process = require("process");

function cat(path) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading ${path}: ${err}`);
      process.exit(1);
    }
    console.log(data);
  });
}

const path = process.argv[2];

if (!path) {
  console.error(`Error finding ${path}`);
  process.exit(1);
}

cat(path);
