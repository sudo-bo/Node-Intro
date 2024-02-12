const fs = require("fs");
const process = require("process");
const axios = require("axios");

function cat(path) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading ${path}: ${err}`);
      process.exit(1);
    }
    console.log(data);
  });
}

async function webCat(url) {
  try {
    const response = await axios.get(url);
    console.log(response.data);
  } catch (err) {
    console.error("Error fetching the URL");
    process.exit(1);
  }
}

function isURL(str) {
  const pattern = /^https?:\/\//i;
  return pattern.test(str);
}

const path = process.argv[2];

if (isURL(path)) {
  webCat(path);
} else {
  cat(path);
}
