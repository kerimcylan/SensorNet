const mongoose = require("mongoose");

const BoxSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: [
    {
      type: Number,
      required: true,
    },
    ],
    slug: {
        type: String,
        required: true,
  },
  fields: [
    {
      field: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "fields",
      },
      data: 
        {
          raw: [
            {
              timestamp: { type: Date, required: true, index: true },
              value: { type: Number, required: true },
            },
          ],
          "1m": [
            {
              timestamp: { type: Date, required: true },
              value: { type: Number, required: true },
            },
          ],
          "5m": [
            {
              timestamp: { type: Date, required: true },
              value: { type: Number, required: true },
            },
          ],
          "30m": [
            {
              timestamp: { type: Date, required: true },
              value: { type: Number, required: true },
            },
          ],
          "1h": [
            {
              timestamp: { type: Date, required: true },
              value: { type: Number, required: true },
            },
          ],
          "4h": [
            {
              timestamp: { type: Date, required: true },
              value: { type: Number, required: true },
            },
          ],
          "12h": [
            {
              timestamp: { type: Date, required: true },
              value: { type: Number, required: true },
            },
          ],
          "1d": [
            {
              timestamp: { type: Date, required: true },
              value: { type: Number, required: true },
            },
          ],
          "1w": [
            {
              timestamp: { type: Date, required: true },
              value: { type: Number, required: true },
            },
          ],
        },
      
    },
  ],
});

BoxSchema.set('autoIndex', false);
BoxSchema.index({"fields.data.raw.timestamp": 1})
module.exports = mongoose.model("boxes", BoxSchema);
