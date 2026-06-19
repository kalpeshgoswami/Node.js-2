import multer from "multer"
import express from "express"

import uploads from "../middleware/upload.js";
import PackageController from "../controller/PackageController.js";

const router = express.Router()

router.post("/add", uploads.single("packageImage"), PackageController.addPackage);

router.get("/getAllPackage", PackageController.getAllPackage);

router.get("/:id", PackageController.getById);

router.delete("/:id", PackageController.deletePackage);

export default router;