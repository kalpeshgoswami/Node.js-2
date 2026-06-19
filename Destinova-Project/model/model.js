import mongoose from "mongoose";

const newSchema = mongoose.Schema({
    packageName: {
        type: String,
        required: true
    },
    packagePrice: {
        type: Number,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    packageImage: {
        type: String,
    }
},
    {
        timestamps: true
    }
)

const Package = mongoose.model("destinova", newSchema);

export default Package;