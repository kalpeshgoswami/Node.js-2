import Package from "../model/model.js";
import httpError from "../middleware/httpError.js";

const add = async (req, res, next) => {

    console.log("API");
    try {

        const { packageName, packagePrice, startDate, endDate } = req.body;

        const newPackage = new Package({
            packageName,
            packagePrice,
            startDate,
            endDate,
            packageImage: req.file?.path
        });

        await newPackage.save();

        res.status(201).json({
            success: true,
            message: "Package added successfully",
            data: newPackage
        });

    } catch (error) {
        next(new httpError(error.message));
    }
};

export default { add };