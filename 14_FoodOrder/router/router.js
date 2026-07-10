import express from "express";
import controller from "../controller/controller.js";
import validate from "../middleware/validate.js";
import userSchema from "../validation/userSchema.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/add", validate(userSchema), controller.add);

router.get("/allData", controller.AllUser)

router.post("/login", controller.login)

router.delete("/deleteAllUsers",controller.deleteAllUsers)

router.post("/authLogin",auth,controller.authLogin)


export default router;