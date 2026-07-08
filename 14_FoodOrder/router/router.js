import express from "express";
import mongoose from "mongoose";
import controller from "../controller/controller.js";

const router = express.Router();

router.post("/add", controller.add);

export default router;