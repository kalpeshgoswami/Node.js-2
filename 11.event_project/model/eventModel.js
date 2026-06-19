import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({

    EventName: {
        type: String,
        required: true
    },

    EventVenue: {
        type: String,
        required: true
    },

    EventDate: {
        type: Date,
        required: true
    },

    EventImage: {
        type: String,
    },

    EventBanner: {
        type: String,
    }

})

const Event = mongoose.model("Event", EventSchema)

export default Event;