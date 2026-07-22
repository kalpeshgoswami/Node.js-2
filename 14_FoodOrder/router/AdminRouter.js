import express from "express";
import controller from "../controller/controller.js";
import validate from "../middleware/validate.js";
import { userSchema, UpdateUserSchema } from "../validation/userSchema.js";
import auth from "../middleware/auth.js";
import uploads from "../middleware/upload.js";
import checkRole from "../middleware/checkRole.js"

const router = express.Router();

router.delete("/delete/:id", auth, checkRole("admin"), controller.deleteUser);

router.patch("/update/:id", auth, checkRole("admin"), uploads.single("userImage"), validate(UpdateUserSchema), controller.authUpdate)

export default router