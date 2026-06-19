import express from "express"
import uploads from "../middleware/upload.js";
import packageController from "../controller/packageController.js";

const router = express.Router()

router.post("/add", uploads.single("packageImage"), packageController.add);

router.get("/getAll", packageController.getAllpackage);

router.get("/:id",packageController.getById);

router.delete("/:id",packageController.DeleteById);

router.patch("/:id",uploads.single("packageImage"),packageController.updatePackage)

export default router;                  