import express from "express";
import upload from "../middleware/upload.js";
import eventController from "../controller/eventController.js";

const router = express.Router();

router.post("/add", upload.fields([
    {
        name: "EventImage",
        maxCount: 1
    },

    {
        name: "EventBanner",
        maxCount: 1
    },

]), eventController.add);

router.get("/getAllEvent", eventController.getAllEvent)


router.get("/:id", eventController.getById)

router.delete("/:id", eventController.deleteById)

router.patch(
    "/:id",
    upload.fields([
        {
            name: "EventImage",
            maxCount: 1,
        },
        {
            name: "EventBanner",
            maxCount: 1,
        },
    ]),
    eventController.UpdateById,
);


export default router;