const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: "" },
    centerlines: { type: Array, default: [] },
    takeoffs: { type: Array, default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", ProjectSchema);
