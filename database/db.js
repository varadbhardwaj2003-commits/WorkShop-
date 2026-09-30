const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../db.json");

function readFile() {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
}

function writeFile(data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

async function readFileWithDelay() {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return readFile();
}

module.exports = {
    readFile,
    writeFile,
    readFileWithDelay
};
