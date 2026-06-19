
import httpError from "../middleware/httpError.js";
import event from "../model/model.js"
import fs from "fs";


// ----- add event ----- 

const create = async (req, res, next) => {
    console.log("Create API Hit");
    try {

        const { eventname, eventDate, eventDescription, eventVenue } = req.body;

        const eventImage = req.files?.eventImage?.map((file) => file.path) || null;

        const eventPoster = req.files?.eventPoster[0]?.path || null;

        const eventBanner = req.files?.eventBanner[0]?.path || null;

        const eventSpeaker = req.files?.eventSpeaker?.map((file) => file.path) || null;

        const eventDocuments = req.files?.eventDocuments?.map((file) => file.path) || null;

        if (!eventDate) {
            return next(new httpError("event date is required", 404));
        }


        const newEvent = await new event({
            eventname, eventDate, eventDescription, eventImage, eventPoster, eventBanner, eventSpeaker, eventVenue, eventDocuments
        });

        await newEvent.save();

        res.status(201).json({ success: true, message: "New Event Added Successfully" });


    } catch (error) {

        console.log(error.message)
        next(new httpError)

    }

}

// ----- all event ----- 

const getAllEvent = async (req, res, next) => {
    try {
        const events = await event.find();

        if (events.length === 0)

            return res.status(404).json({
                success: true, message: "event data is not found"
            });

        res.status(200).json({
            success: true, message: "event date found", events
        })

    } catch (error) {
        return next(new httpError("route not found", 404));
    }
};


// ----- find by id ----- 


const getById = async (req, res, next) => {

    try {

        const { id } = req.params;

        const events = await event.findById(id)

        if (!events) {
            return next(new httpError("event data is not found", 404))
        }

        res.status(200).json({ success: true, message: "Event Data", events })

    } catch (error) {

        next(new httpError(error.message, 500))

    }

}

// ----- delete by id ----- 

// const deleteById = async (req, res, next) => {


//     try {

//         const { id } = req.params;

//         const deleteEvent = await event.findById(id);

//         if (!deleteEvent) {
//             return next(new httpError("Event is not found", 400));
//         }

//         if (deleteEvent.eventImage?.length) {
//             deleteEvent.eventImage.forEach(file => {
//                 fs.unlinkSync(file);
//             });
//         }

//         if (deleteEvent.eventPoster) {
//             fs.unlinkSync(deleteEvent.eventPoster);
//         }

//         if (deleteEvent.eventBanner) {
//             fs.unlinkSync(deleteEvent.eventBanner);
//         }

//         if (deleteEvent.eventSpeaker?.length) {
//             deleteEvent.eventSpeaker.forEach(file => {
//                 fs.unlinkSync(file);
//             });
//         }

//         if (deleteEvent.eventDocuments?.length) {
//             deleteEvent.eventDocuments.forEach(file => {
//                 fs.unlinkSync(file);
//             });
//         }

//         await event.findByIdAndDelete(id);

//     } catch (error) {
//         next(new httpError(error.message, 500));
//     }
// };


const deleteById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deleteEvent = await event.findById(id);

        if (!deleteEvent) {
            return next(new httpError("Event not found", 404));
        }

        if (deleteEvent.eventImage?.length) {
            deleteEvent.eventImage.forEach(file => {
                if (fs.existsSync(file)) {
                    fs.unlinkSync(file);
                }
            });
        }

        if (deleteEvent.eventPoster) {
            if (fs.existsSync(deleteEvent.eventPoster)) {
                fs.unlinkSync(deleteEvent.eventPoster);
            }
        }

        if (deleteEvent.eventBanner) {
            if (fs.existsSync(deleteEvent.eventBanner)) {
                fs.unlinkSync(deleteEvent.eventBanner);
            }
        }

        if (deleteEvent.eventSpeaker?.length) {
            deleteEvent.eventSpeaker.forEach(file => {
                if (fs.existsSync(file)) {
                    fs.unlinkSync(file);
                }
            });
        }

        if (deleteEvent.eventDocuments?.length) {
            deleteEvent.eventDocuments.forEach(file => {
                if (fs.existsSync(file)) {
                    fs.unlinkSync(file);
                }
            });
        }
        await event.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Event deleted successfully",
        });

    } catch (error) {
        next(new httpError(error.message, 500));
    }
};


//  ----- update ----- 

const updateEvent = async (req, res, next) => {

    try {

        const { id } = req.params;

        const eventData = await event.findById(id);

        if (!eventData) {
            return next(new httpError("event not found with this id", 404));
        }

        const updates = Object.keys(req.body);

        const allowedFiled = [
            "eventImage",
            "eventPoster",
            "eventBanner",
            "eventSpeaker",
            "eventDocuments"
        ];

        const isValidUpdate = updates.every((field) => {
            return allowedFiled.includes(field);
        });

        if (!isValidUpdate) {
            return next(
                new httpError("only allowed field can be updated", 400));
        }

        const eventImage = req.files?.eventImage?.map((file) => file.path) || null
        const eventPoster = req.files?.eventPoster?.map((file) => file.path) || null
        const eventBanner = req.files?.eventBanner?.[0]?.path || null;
        const eventSpeaker = req.files?.eventSpeaker?.map((file) => file.path) || null
        const eventDocuments = req.files?.eventDocuments?.map((file) => file.path) || null

        if (eventImage) {
            eventData.eventImage.forEach(file => {
                if (fs.existsSync(file)) {
                    fs.unlinkSync(file);
                }
            });

            eventData.eventImage = eventImage;


        }

        if (eventPoster) {
            eventData.eventPoster.forEach(file => {
                if (fs.existsSync(file)) {
                    fs.unlinkSync(file);
                }
            });

        }

        if (eventBanner) {
            if (eventData.eventBanner &&
                fs.existsSync(eventData.eventBanner)) {
                fs.unlinkSync(eventData.eventBanner);

            }

        }

        if (eventSpeaker) {
            eventData.eventSpeaker.forEach(file => {
                if (fs.existsSync(file)) {
                    fs.unlinkSync(file);
                }
            });

        }

        if (eventDocuments) {
            eventData.eventDocuments.forEach(file => {
                if (fs.existsSync(file)) {
                    fs.unlinkSync(file);
                }
            });

        }

        updates.forEach((u) => {
            eventData[u] = req.body[u]
        });

        await eventData.save()

        res.status(200).json({
            success: true,
            message: "Event Updated Successfully",
            eventData
        })


    } catch (error) {
        next(new httpError(error.message, 500))
    }

}


export default { create, getAllEvent, getById, deleteById, updateEvent };