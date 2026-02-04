const express = require("express");

const app = express();

// Middleware
app.use(express.json());

// Routes
const departmentRoutes = require("./routes/departmentRoutes");
app.use("/", departmentRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API is running");
});


const employeeRoutes = require("./routes/employeeRoutes");
app.use("/", employeeRoutes);



module.exports = app;
