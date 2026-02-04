const express = require("express");
const router = express.Router();

const {
  getEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

router.get("/getEmployee", getEmployees);
router.get("/getEmployee/:id", getEmployeeById);
router.post("/addEmployee", addEmployee);
router.put("/updateEmployee/:id", updateEmployee);
router.put("/deleteEmployee/:id", deleteEmployee);

module.exports = router;
