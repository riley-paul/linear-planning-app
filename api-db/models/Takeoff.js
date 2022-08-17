const mongoose = require("mongoose");

const TakeoffSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    revisions: [
      {
        date_received: Date,
        description: String,
        data: [
          {
            chainage_beg: Number,
            chainage_end: Number,
            text: String,
            family: String,
            value: Number,
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Takeoff", TakeoffSchema);
