import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    userId: String,
    name: { type: String, required: true },
    description: { type: String, default: "" },
    centerlines: { type: [{ id: String, name: String }], default: [] },
    takeoffs: { type: [{ id: String, name: String }], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model("Project", ProjectSchema);
