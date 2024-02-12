const fs = require("fs");
const process = require("process");
const axios = require("axios");

function cat(path, outputFile = null) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading ${path}: ${err}`);
      process.exit(1);
    }
    handleOutput(data, outputFile);
  });
}

async function webCat(url, outputFile = null) {
  try {
    const response = await axios.get(url);
    handleOutput(response.data, outputFile);
  } catch (err) {
    console.error("Error fetching the URL");
    process.exit(1);
  }
}

function handleOutput(content, outputFile) {
  if (outputFile) {
    fs.writeFile(outputFile, content, "utf8", (err) => {
      if (err) {
        console.error(`Couldn't write to ${outputFile}:`, err);
        process.exit(1);
      }
    });
  } else {
    console.log(content);
  }
}

function isURL(str) {
  const pattern = /^https?:\/\//i;
  return pattern.test(str);
}

let path;
let out;

if (process.argv[2] === "--out") {
  out = process.argv[3];
  path = process.argv[4];
} else {
  path = process.argv[2];
}

if (isURL(path)) {
  webCat(path, out);
} else {
  cat(path, out);
}
