const mongoose = require("mongoose");

const featureCollectionSchema = mongoose.Schema({
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
    name: { type: String, required: true },
    description: String,
    line: { type: featureCollectionSchema, required: true },
    markers: { type: featureCollectionSchema, required: true },
    footprint: featureCollectionSchema,
    elevation: [{ x: Number, y: Number }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Centerline", CenterlineSchema);
