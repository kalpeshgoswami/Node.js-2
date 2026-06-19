
import httpError from "../middleware/httpError.js";
import event from "../model/eventModel.js"
import fs from "fs";

// ----- add event ----

const add = async (req, res, next) => {

    try {

        const { EventName, EventDate, EventVenue } = req.body;

        const EventImage = req.files?.EventImage[0]?.path || null;

        const EventBanner = req.files?.EventBanner[0]?.path || null;

        if (!EventDate) {
            return next(new httpError("event date is required", 404));
        }

        const newEvent = await new event({
            EventName, EventDate, EventImage, EventBanner, EventVenue,
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

// ---- find by id -----

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

const deleteById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deleteById = await event.findById(id);

        if (!deleteById) {
            return next(new httpError("event not found", 404));
        }

        const filesToDelete = [
            deleteById.EventImage,
            deleteById.EventBanner,
        ];

        filesToDelete.forEach((file) => {
            if (fs.existsSync(file)) {
                fs.unlinkSync(file);
            } else {
                return next(new httpError("failed to delete"));
            }
        });

        await event.findByIdAndDelete(id);

        res
            .status(200)
            .json({ success: true, message: "event deleted successfully" });
    } catch (error) {
        next(new httpError(error.message));
    }
};


// -----  update by id -----

const UpdateById = async (req, res, next) => {
    try {
        const id = req.params.id;

        const events = await event.findById(id);

        if (!events) {
            return next(new httpError("event not found", 404));
        }

        const updates = Object.keys(req.body || {});

        const allowed = [
            "EventName",
            "EventVenue",
            "EventDate",
        ];

        const isAllowedField = updates.every((field) => allowed.includes(field));

        if (!isAllowedField) {
            return next(new httpError("only allowed field can be updated", 400));
        }

        if (req.files?.EventImage) {
            fs.unlinkSync(events.EventImage);

            events.EventImage = req.files?.EventImage?.[0]?.path || null;
        }

        if (req.files?.EventBanner) {
            fs.unlinkSync(events.EventBanner);

            events.EventBanner = req.files?.EventBanner?.[0]?.path || null;
        }

        updates.forEach((update) => {
            events[update] = req.body[update];
        });

        await events.save();

        res.status(200).json({
            success: true,
            message: "event data updated successfully",
            events,
        });
    } catch (error) {
        return next(new httpError(error.message, 500));
    }
};




export default { add, getAllEvent, getById, deleteById, UpdateById };
