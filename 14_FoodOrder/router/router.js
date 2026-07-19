import express from "express";
import controller from "../controller/controller.js";
import validate from "../middleware/validate.js";
import { userSchema, UpdateUserSchema } from "../validation/userSchema.js";
import auth from "../middleware/auth.js";
import uploads from "../middleware/upload.js";
import checkRole from "../middleware/checkRole.js"

const router = express.Router();

router.post("/add", uploads.single("userImage"), validate(userSchema), controller.add);

router.get("/allData", checkRole("admin"), controller.AllUser);

router.post("/login", controller.login);

router.delete("/deleteAllUsers", controller.deleteAllUsers);

router.post("/authLogin", auth, controller.authLogin);

router.delete("/authDelete", auth, controller.authDelete);

router.post("/logout", auth, controller.logOut)

router.patch("/update", auth, uploads.single("userImage"), validate(UpdateUserSchema), controller.authUpdate)

export default router;