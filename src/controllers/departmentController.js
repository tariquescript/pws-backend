const Department = require("../models/Department");

// GET all active departments
exports.getDepartments = async (req, res) => {
  try {
    const departments = await Department.find({ status: true });
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET department by ID
exports.getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    if (!department.status) {
      return res.status(400).json({ message: "Department is inactive" });
    }

    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADD department
exports.addDepartment = async (req, res) => {
  try {
    const department = new Department(req.body);
    await department.save();

    res.status(201).json({
      message: "Department added successfully",
      data: department,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// UPDATE department
exports.updateDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.status(200).json({
      message: "Department updated successfully",
      data: department,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// SOFT DELETE department
exports.deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndUpdate(
      req.params.id,
      { status: false },
      { new: true }
    );

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.status(200).json({
      message: "Department deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
