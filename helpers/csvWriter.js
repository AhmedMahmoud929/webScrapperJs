const createCsvWriter = require("csv-writer").createObjectCsvWriter;

module.exports = async (records, fileName, headers) => {
  const csvWriter = createCsvWriter({
    path: `./output/${fileName}`,
    header: headers,
  });
  await csvWriter.writeRecords(records);
};
