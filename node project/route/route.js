import express from "express";

import Controller from "../Controller/Controller.js"

const router = express.Router();

router.post("/add", Controller.add);

router.get("/getAllStudents", Controller.AllStudent);

router.get("/:id", Controller.studentById);

router.delete("/:id",Controller.deleteById);

router.patch("/:id",Controller.updateById);

export default router;