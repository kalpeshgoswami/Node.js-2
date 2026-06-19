import express from "express"
import uploads from "../middleware/upload.js";
import packageController from "../controller/packageController.js";

const router = express.Router()

router.post("/add", uploads.single("packageImage"), packageController.add);

export default router;                  