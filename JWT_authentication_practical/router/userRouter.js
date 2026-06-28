import express from "express";
import userController from "../controller/userController.js";
import auth from "../middleware/auth.js";

const router = express.Router()

router.post("/add", userController.addUser);

router.get("/getAll", userController.getAllUser);

router.post("/login", userController.login);

router.post("/authLogin", auth, userController.authLogin);

router.delete("/authDelete", auth, userController.authDelete);

router.get("/logOut", auth, userController.logOut);

router.get("/AllLogOut", auth, userController.AllLogOut);

router.patch("/update", auth, userController.updateUser);

export default router;