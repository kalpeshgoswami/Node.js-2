import Package from "../model/model.js";
import httpError from "../middleware/httpError.js";
import cloudinary from "../config/cloudinary.js";

// -----  add package -----

const add = async (req, res, next) => {

    console.log("API");
    try {

        const { packageName, packagePrice, startDate, endDate } = req.body;

        const newPackage = new Package({
            packageName,
            packagePrice,
            startDate,
            endDate,
            packageImage: req.file?.path,
            cloudinary_id: req.file.filename
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

// ----- get all package -----

const getAllpackage = async function (req, res, next) {

    try {

        const AllPackage = await Package.find();

        if (AllPackage.length === 0) {
            return next(new httpError("no package found", 404))
        }
        res.status(200).json({ success: true, message: "All package is available", AllPackage })

    } catch (error) {
        next(new httpError(error.message));
    }
};

// -----  find by id -----

const getById = async (req, res, next) => {

    try {

        const id = req.params.id;

        const newPackage = await Package.findById(id);

        if (!newPackage) {
            return next(new httpError("package data is not found", 404))
        }
        res.status(200).json({ success: true, message: "package data is found", newPackage });

    } catch (error) {
        next(new httpError(error.message));
    }
}

// ----- delete package -----

const DeleteById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const newPackage = await Package.findById(id);

        if (!newPackage) {
            return next(new httpError("Package id not found", 404));
        }

        // console.log("Cloudinary ID:", newPackage.cloudinary_id);

        if (newPackage.cloudinary_id) {
            await cloudinary.uploader.destroy(newPackage.cloudinary_id);
        }

        await newPackage.deleteOne();

        res.status(200).json({
            success: true,
            message: "Package deleted successfully",
        });

    } catch (error) {
        next(new httpError(error.message, 500));
    }
};


// ----- update -----

const updatePackage = async function (req, res, next) {
    try {
        const { id } = req.params;

        const newPackage = await Package.findById(id);

        if (!newPackage) {
            return next(new httpError("No package found", 404));
        }

        const update = Object.keys(req.body);

        const allowedField = [
            "packageName",
            "packageImage",
        ];
        const isAllowed = update.every((field) => allowedField.includes(field));

        if (!isAllowed) {
            return next(new httpError("only allowed field can be updated", 400));
        }

        update.forEach((update) => {
            newPackage[update] = req.body[update];
        });

        if (req.file) {

            if (newPackage.cloudinary_id) {
                await cloudinary.uploader.destroy(newPackage.cloudinary_id);
            }

            newPackage.packageImage = req.file.path;
            newPackage.cloudinary_id = req.file.filename;
        }

        await newPackage.save();

        res.status(200).json({
            success: true,
            message: "package updated succesfully",
            date: newPackage,
        });
    } catch (error) {
        next(new httpError(error.message, 500));
    }
};
export default { add, getAllpackage, getById, DeleteById, updatePackage };