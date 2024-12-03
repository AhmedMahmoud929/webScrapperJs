const { pagesScrapper } = require("./helpers/dataScrapper");
const csvWriter = require("./helpers/csvWriter");

const main = async () => {
  // [1] Scrapping pages
  const allUrls = [];
  console.log("[1] Scrapping pages...");
  for (let i = 1; i <= 333; i++) {
    console.log(`    > page ${i}...`);
    const pageUrls = await pagesScrapper(i);
    allUrls.push(...pageUrls);
  }

  // [2] Removing duplicates
  console.log("[2] Removing duplicates...");
  const uniqueUrls = Array.from(new Set(allUrls));
  console.log(
    `    > removed duplicates. Total unique cars: ${uniqueUrls.length}`
  );

  // [3] Exporting CSV
  console.log("[3] Exporting to CSV...");
  const records = uniqueUrls.map((carHref) => ({ carHref }));
  const headers = [{ id: "carHref", title: "carHref" }];
  csvWriter(records, "carPages.csv", headers);

  // [4] Done
  console.log("[4] Data successfully exported to ./output/carPages.csv");
};

main();
