const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
  {
    departmentId: {
      type: String,
      required: [true, "Department ID is required"],
      trim: true,
    },
    departmentName: {
      type: String,
      required: [true, "Department name is required"],
      trim: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Department", departmentSchema);
