const mongoose = require("mongoose");

const BoxSchema = mongoose.Schema({
    boxName: {
        type: String,
        required: true,
    },
    location: [
        {
            type: Number,
            required: true,
        },
    ],
    fields: [
        {
            fieldCount: {
                type: Number,
                required: true,
            },
            fieldID: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "Field",
            },
            data: [
                {
                    raw: [
                        {
                            timestamp: { type: Date, required: true },
                            value: { type: Number, required: true },
                        },
                    ],
                    minuteOne: [
                        {
                            timestamp: { type: Date, required: true },
                            value: { type: Number, required: true },
                        },
                    ],
                    dayOne: [
                        {
                            timestamp: { type: Date, required: true },
                            value: { type: Number, required: true },
                        },
                    ],
                },
            ],
        },
    ],
});

module.exports = mongoose.model("Box", BoxSchema);
