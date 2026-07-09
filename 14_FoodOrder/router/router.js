import express from "express";
import controller from "../controller/controller.js";
import validate from "../middleware/validate.js";
import userSchema from "../validation/userSchema.js";

const router = express.Router();

router.post("/add", validate(userSchema), controller.add);

router.get("/allData", controller.AllUser)

router.post("/login", controller.login)


export default router;