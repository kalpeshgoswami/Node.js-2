import express from "express";
import restaurantController from "../controller/restaurantController.js";
import validate from "../middleware/validate.js";
import { restaurantSchema } from "../validation/restaurantSchema.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/upload.js";
import checkRole from "../middleware/checkRole.js"

const router = express.Router();

router.post("/addRest", auth, checkRole("admin"), upload.single("restaurantImage"), validate(restaurantSchema), restaurantController.add)

export default router