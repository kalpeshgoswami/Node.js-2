import express from "express";

import controller from "../controller/controller.js";
import model from "../model/model.js"

const router = express.Router();

router.post("/add", controller.add);

router.get("/getAllEmployee", controller.getAllEmployee);

router.delete("/delete", controller.deleleAllData);

router.get("/:id", controller.employeeByID);

router.delete("/:id", controller.deleteById);

// router.patch("/:id", controller.updateById);

router.patch("/:id", controller.updateManually);

export default router;