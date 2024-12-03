const axios = require("axios");
const cheerio = require("cheerio");

const baseURL = "https://www.dubicars.com/uae/new?page=";

const carDetailsDefault = {
  title: "",
  description: "",
  transmission: "",
  steeringSide: "",
  color: "",
  interiorColor: "",
  model: "",
  make: "",
  vehicleType: "",
  fuelType: "",
  wheelSize: "",
  price: 0,
  modelYear: 0,
  seatingCapacity: 0,
  numberOfDoors: 0,
  horsepower: 0,
  cylinders: 0,
  engineCapacity: 0,
  images: [],
};

const oneValueKeys = [
  "transmission",
  "steeringSide",
  "color",
  "interiorColor",
  "model",
  "make",
  "vehicleType",
  "fuelType",
  "wheelSize",
];

const twoValueKeys = [
  "horsepower",
  "cylinders",
  "engineCapacity",
  "modelYear",
  "seatingCapacity",
  "numberOfDoors",
];

const pagesScrapper = async (page) => {
  try {
    const { data } = await axios.get(`${baseURL}${page}`);
    const $ = cheerio.load(data);

    const cars = [];
    $(".serp-list-item a").each((ix, ele) => {
      const carHref = $(ele).attr("href");
      if (
        carHref &&
        carHref.startsWith("https://www.dubicars.com") &&
        carHref.endsWith(".html")
      )
        cars.push(carHref);
    });

    return cars;
  } catch (error) {
    console.error(`Error scraping page ${page}:`, error.message);
    return [];
  }
};

const carDetailsScrapper = async (carUrl) => {
  try {
    const slicedUrl = carUrl.slice(8, 38);
    console.log("    > Fetching:", slicedUrl + "...");
    const carDetails = carDetailsDefault;

    const { data } = await axios.get(`${carUrl}`);
    const $ = cheerio.load(data);
    // Car Title
    const title = $("section#title-bar span.car-title").text();
    carDetails.title = title;

    // Car Description
    const description = $("p#car-description").text();
    carDetails.description = description;

    // Car Price
    const priceArr = $("section.info-panel.laptop-only > div.price")
      .text()
      .trim()
      .split(" ");
    if (priceArr[1] !== undefined) {
      const price = Number(priceArr[1].replaceAll(",", ""));
      carDetails.price = price;
    }

    // Car Images
    const collectedImages = [];
    $("ul.slider-container li.carImageItem img").each((ix, ele) => {
      const carImg = $(ele).attr("src");
      collectedImages.push(carImg);
    });
    carDetails.images = JSON.stringify(collectedImages);

    // Car Specifications
    $("div#specifications-container ul.faq__data li.fd-col.laptop-only").each(
      (ix, ele) => {
        const key = $(ele)
          .find(" > span:first-child")
          .text()
          .trim()
          .split(" ")
          .map((word, idx) =>
            idx === 0
              ? word.toLowerCase()
              : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join("");

        const value = $(ele).find("span:last-child").text().trim();
        if (oneValueKeys.includes(key)) carDetails[key] = value;
        else if (twoValueKeys.includes(key))
          carDetails[key] = Number(value.split(" ")[0]);
      }
    );

    // console.log(carDetails);

    return carDetails;
  } catch (error) {
    console.error(`Error:`, error.message);
    return null;
  }
};

module.exports = { pagesScrapper, carDetailsScrapper };
