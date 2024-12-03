const csvReader = require("../helpers/csvReader");
const mongoose = require("mongoose");
const Car = require("./models/Car");

const DB_URI = "YOUR DB URI";

const carsHeaders = [
  "title",
  "description",
  "transmission",
  "steeringSide",
  "color",
  "interiorColor",
  "model",
  "make",
  "vehicleType",
  "fuelType",
  "wheelSize",
  "price",
  "modelYear",
  "seatingCapacity",
  "numberOfDoors",
  "horsepower",
  "cylinders",
  "engineCapacity",
  "images",
];

async function main() {
  try {
    // [1] Connect to MongoDB
    await mongoose.connect(DB_URI);
    console.log("DB Connected...");

    // [2] Get the parsed data
    const carsData = await csvReader(
      "./output/carDetails.new.csv",
      carsHeaders,
      ["images"]
    );

    // [3] Insert Data into mongoose
    await Car.insertMany(carsData);
    console.log("Data inserted successfully");
  } catch (error) {
    console.log(error);
  }
}

main();
