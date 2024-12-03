const { carDetailsScrapper } = require("./helpers/dataScrapper");
const csvReader = require("./helpers/csvReader");
const csvWriter = require("./helpers/csvWriter");

const main = async () => {
  try {
    // [1] Read CSV file
    console.log("[1] Read CSV file");
    const csvFilePath = "./output/carPages.csv";
    const carsUrls = await csvReader(csvFilePath, ["carHref"]);

    // [2] Car pages scrapping
    console.log("[2] Car Page Scrapping");
    const carsDetailsArr = [];
    let i = 1;
    for (const url of carsUrls) {
      const car = await carDetailsScrapper(url);
      if (car !== null) carsDetailsArr.push({ ...car });
    }

    // [3] Exporting CSV
    console.log("[3] Exporting to CSV...");
    const headers = [
      { id: "title", title: "title" },
      { id: "description", title: "description" },
      { id: "transmission", title: "transmission" },
      { id: "steeringSide", title: "steeringSide" },
      { id: "color", title: "color" },
      { id: "interiorColor", title: "interiorColor" },
      { id: "model", title: "model" },
      { id: "make", title: "make" },
      { id: "vehicleType", title: "vehicleType" },
      { id: "fuelType", title: "fuelType" },
      { id: "wheelSize", title: "wheelSize" },
      { id: "price", title: "price" },
      { id: "modelYear", title: "modelYear" },
      { id: "seatingCapacity", title: "seatingCapacity" },
      { id: "numberOfDoors", title: "numberOfDoors" },
      { id: "horsepower", title: "horsepower" },
      { id: "cylinders", title: "cylinders" },
      { id: "engineCapacity", title: "engineCapacity" },
      { id: "images", title: "images" },
    ];
    csvWriter(carsDetailsArr, "carDetails.csv", headers);

    // [4] Done
    console.log("[4] Data successfully exported to ./output/carDetails.csv");
  } catch (error) {
    console.error("Error:", error.message);
  }
};

main();
