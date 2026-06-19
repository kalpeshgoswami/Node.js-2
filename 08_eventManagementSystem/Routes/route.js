import express from "express";
import upload from "../middleware/upload.js";
import controller from "../controller/controller.js";

const router = express.Router();

router.post("/create", upload.fields([
    {
        name: "eventImage",
        maxCount: 5
    },
    {
        name: "eventPoster",
        maxCount: 1
    },
    {
        name: "eventBanner",
        maxCount: 1
    },
    {
        name: "eventSpeaker",
        maxCount: 3
    },
    {
        name: "eventDocuments",
        maxCount: 3
    },

]),

    controller.create
);

router.get("/getAllEvent", controller.getAllEvent);

router.get("/:id", controller.getById);

router.delete("/:id", controller.deleteById);

router.patch("/:id", upload.fields
    ([
        { name: "eventImage", maxCount: 3 },
        { name: "eventPoster", maxCount: 2 },
        { name: "eventBanner", maxCount: 1 },
        { name: "eventSpeaker", maxCount: 2 },
        { name: "eventDocuments", maxCount: 2 },
    ]),
    controller.updateEvent
);

export default router;