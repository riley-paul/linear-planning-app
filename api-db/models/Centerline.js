import mongoose from "mongoose";

const FeatureCollectionSchema = mongoose.Schema({
  features: {
    type: Array,
    default: [],
    require: true,
  },
  type: {
    type: String,
    enum: ["FeatureCollection"],
    default: "FeatureCollection",
    required: true,
  },
});

const CenterlineSchema = new mongoose.Schema(
  {
    projectId: { type: String, required: true },
    name: { type: String, required: true },
    description: String,
    line: { type: FeatureCollectionSchema, required: true },
    markers: { type: FeatureCollectionSchema, required: true },
    footprint: FeatureCollectionSchema,
    elevation: { rows: [], columns: [] },
  },
  { timestamps: true }
);

export default mongoose.model("Centerline", CenterlineSchema);
