const express = require("express");
const app = express();
const sequelize = require("../models").sequelize;
const revenueRoutes = require("./routes/revenueRoutes");

app.use(express.json());
app.use("/api", revenueRoutes);

const PORT = process.env.PORT || 3000;

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });
