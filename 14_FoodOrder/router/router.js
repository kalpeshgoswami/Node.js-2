import express from "express";
import mongoose from "mongoose";
import controller from "../controller/controller.js";

const router = express.Router();

router.post("/add", controller.add);

router.get("/allData", controller.AllUser)

router.post("/login", controller.login)

export default router;