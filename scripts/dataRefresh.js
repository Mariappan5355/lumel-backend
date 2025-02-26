const cron = require("node-cron");
const importCSV = require("./importCsv");

cron.schedule("0 0 * * *", () => {
  console.log("Refreshing data...");
  importCSV("path/to/sales.csv");
});
