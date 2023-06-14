const mongoose = require("mongoose");

const FieldSchema = mongoose.Schema({
    name: { type: String, required: true },
    min: { type: Number, required: true },
    max: { type: Number, required: true },
    AQI: { type: Number, required: true },
});

module.exports = mongoose.model("fields", FieldSchema);
