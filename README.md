# 🚗 WebScraperJS - Car Data Scraper 🌐

A Node.js web scraping application that collects car listing data from dubicars.com and exports it to CSV format. 📊

## ✨ Features

- 🔍 Scrapes car listings from multiple pages
- 🚙 Extracts detailed car information including specifications
- 🗑️ Removes duplicate entries
- 📁 Exports data to CSV format
- 🖼️ Handles image URLs collection
- ⚠️ Error handling and logging

## 📂 Project Structure

```
WEBSCRABBERJS/
├── 📁 helpers/
│ ├── 📄 csvReader.js # CSV file reading utility
│ ├── 📄 csvWriter.js # CSV file writing utility
│ └── 📄 dataScraper.js # Web scraping core functionality
├── 📁 output/ # Generated CSV files directory
├── 📄 extractData.js # Script to extract car details
├── 📄 extractPages.js # Script to extract car listing pages
└── 📦 package.json
```

## 🛠️ Prerequisites

- 🟢 Node.js (v12 or higher)
- 📦 NPM (Node Package Manager)

## 🔧 Dependencies

- 🌐 axios - HTTP client for making requests
- 🧰 cheerio - HTML parsing and manipulation
- 📊 csv-parser - CSV file parsing
- 📝 csv-writer - CSV file writing

## 🚀 Installation

1. 📥 Clone the repository
2. 📦 Install dependencies:
   ```bash
   npm install
   ```

## 🏁 Usage

### 1. 📃 Extract Car Listing Pages

Run the following command to collect all car listing URLs:

```bash
node extractPages.js
```

This will:

- 🕷️ Scrape all car listing pages
- 🗑️ Remove duplicate entries
- 📄 Generate \`carPages.csv\` in the output directory

### 2. 🚗 Extract Car Details

After collecting the URLs, run:

```bash
node extractData.js
```

This will:

- 📖 Read URLs from \`carPages.csv\`
- 🔍 Scrape detailed information for each car
- 📊 Generate \`carDetails.csv\` with complete car information

## 📊 Output Data Structure

The generated CSV includes the following car details:

- 📌 Title
- 📝 Description
- 🕹️ Transmission
- 🚘 Steering Side
- 🎨 Color
- 🛋️ Interior Color
- 🚙 Model
- 🏭 Make
- 🚐 Vehicle Type
- ⛽ Fuel Type
- 🛞 Wheel Size
- 💰 Price
- 📅 Model Year
- 👥 Seating Capacity
- 🚪 Number of Doors
- 🐎 Horsepower
- 🔧 Cylinders
- 🔋 Engine Capacity
- 🖼️ Images (JSON array of URLs)

## ⚠️ Error Handling

The application includes error handling for:

- 🌐 Failed HTTP requests
- 🧩 Invalid HTML parsing
- 💾 File system operations
- 📊 CSV reading/writing operations

## 🤝 Contributing

Feel free to submit issues and enhancement requests! 🙌

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## ⚠️ Disclaimer

This tool is for educational purposes only. Make sure to review and comply with the target website's terms of service and robots.txt file before use. 🕵️‍♂️
