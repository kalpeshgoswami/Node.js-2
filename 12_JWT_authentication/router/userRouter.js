import express from "express";

import userController from "../controller/userController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/add", userController.add);

router.get("/getAll", userController.getAll)

router.post("/login", userController.login);

router.get("/authLogin", auth, userController.authLogin);

router.delete("/authDelete", auth, userController.authDelete);

router.patch("/AuthUpdate", auth, userController.AuthUpdate);

router.get("/logOut", auth, userController.logOut);

router.get("/AllLogOut", auth, userController.AllLogOut);

export default router;