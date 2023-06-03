const mongoose = require("mongoose");

const BoxSchema = mongoose.Schema({
  boxName: {
    type: String,
    required: true,
  },
  fields: [
    {
      fieldName: String,
      data: [{ timestamp: { type: Number, index: true }, value: Number }],
    },
  ],
});

module.exports = mongoose.model("Boxes", BoxSchema);
