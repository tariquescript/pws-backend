const Employee = require("../models/Employee");
const Department = require("../models/Department");

// GET all active employees
exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({ status: true }).populate(
      "departmentId",
      "departmentId departmentName"
    );

    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET employee by ID
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id).populate(
      "departmentId",
      "departmentId departmentName"
    );

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    if (!employee.status) {
      return res.status(400).json({ message: "Employee is inactive." });
    }

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADD employee
exports.addEmployee = async (req, res) => {
  try {
    const { departmentId } = req.body;

    // Check if department exists and is active
    const department = await Department.findOne({
      _id: departmentId,
      status: true,
    });

    if (!department) {
      return res
        .status(400)
        .json({ message: "Invalid or inactive department" });
    }

    const employee = new Employee(req.body);
    await employee.save();

    res.status(201).json({
      message: "Employee added successfully",
      data: employee,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// UPDATE employee
exports.updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({
      message: "Employee updated successfully",
      data: employee,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// SOFT DELETE employee
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { status: false },
      { new: true }
    );

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({
      message: "Employee deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
