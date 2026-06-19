import mongoose from "mongoose";

const PackageSchema = new mongoose.Schema({

    packageName: {
        type: String,
        required: true,
        trim: true
    },
    packagePrice: {
        type: Number,
        required: true,
        trim: true
    },
    packageDestination: {
        type: String,
        required: true,
        trim: true
    },
    startDate: {
        type: String,
        required: true,
        trim: true
    },
    endDate: {
        type: String,
        required: true,
        trim: true
    },
    packageImage: {
        type: String,
        // required: true,
    },
    duration: {
        type: Number,
        required: true
    },

    cloudinary_id: {
        type: String,
    }
},
    {
        timestamps: true,
    }
);

const Packages = mongoose.model("Packages", PackageSchema);

export default Packages;