import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({

    eventname: {
        type: String,
        required: true,
        trim: true
    },
    eventDate: {
        type: Date,
        required: true
    },
    eventDescription: {
        type: String
    },
    eventImage: {
        type: [String],
        required: true
    },
    eventPoster: {
        type: [String],
        required: true
    },
    eventBanner: {
        type: String,
        required: true
    },
    eventSpeaker: {
        type: [String],
        required: true
    },
    eventVenue: String,
    eventDocuments: [String]
},
    {
        timestamps: true
    }
);

const event = mongoose.model("event", eventSchema);

export default event;