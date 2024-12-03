const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  title: { type: String, trim: true },
  description: { type: String, trim: true },
  transmission: { type: String, trim: true },
  color: { type: String, trim: true },
  interiorColor: { type: String, trim: true },
  model: { type: String, trim: true },
  make: { type: String, trim: true },
  vehicleType: { type: String, trim: true },
  fuelType: { type: String, trim: true },
  wheelSize: { type: String, trim: true },

  price: { type: Number, required: true },
  modelYear: { type: Number, required: true },
  seatingCapacity: { type: Number, required: true },
  numberOfDoors: { type: Number, required: true },
  horsepower: { type: Number, required: true },
  cylinders: { type: Number, required: true },
  engineCapacity: { type: Number, required: true },

  images: { type: [String] },

  createdAt: { type: Date, default: Date.now },
});

const Car = mongoose.model("Car", carSchema);
module.exports = Car;
