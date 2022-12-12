const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const categorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
    },

    { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

module.exports = model("category", categorySchema);
