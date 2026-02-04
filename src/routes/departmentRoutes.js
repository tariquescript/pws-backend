const express = require("express");
const router = express.Router();

const {
  getDepartments,
  getDepartmentById,
  addDepartment,
  updateDepartment,
  deleteDepartment,
} = require("../controllers/departmentController");

router.get("/getDepartment", getDepartments);
router.get("/getDepartment/:id", getDepartmentById);
router.post("/addDepartment", addDepartment);
router.put("/updateDepartment/:id", updateDepartment);
router.put("/deleteDepartment/:id", deleteDepartment);

module.exports = router;
