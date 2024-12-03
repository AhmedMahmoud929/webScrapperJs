const fs = require("fs");
const csvParser = require("csv-parser");

module.exports = async (
  csvFilePath = "",
  headers = [],
  stringifiedCells = []
) => {
  return new Promise((resolve, reject) => {
    const parsedData = [];

    fs.createReadStream(csvFilePath)
      .pipe(csvParser())
      .on("data", (row) => {
        const newItem = {};
        headers.map((col) => (newItem[col] = row[col]));
        stringifiedCells.map((cell) => {
          if (Object(newItem).hasOwnProperty(cell))
            newItem[cell] = JSON.parse(newItem[cell]);
        });
        parsedData.push(newItem);
      })
      .on("end", () => {
        resolve(parsedData);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};
