import httpError from "../middleware/HttpError.js";

import Packages from "../model/package.js";
import cloudinary from "../config/cloudinary.js";

// add package

const addPackage = async (req, res, next) => {

    try {

        const {
            packageName,
            packagePrice,
            packageDestination,
            startDate,
            endDate,
            duration
        } = req.body

        // const packageImage = req.file?.path;


        const newPackage = new Packages({

            packageName,
            packagePrice,
            packageDestination,
            startDate,
            endDate,
            packageImage:req.file?.path,
            duration,
            cloudinary_id:req.file.filename
        })
        await newPackage.save();

        res.status(201).json({ success: true, message: "package Added Successfully", newPackage });

    } catch (error) {
        next(new HttpError(error.message, 500));
    }

}

// all package

const getAllPackage = async (req, res, next) => {

    try {
        const packages = await Packages.find();

        if (packages.length === 0)

            return res.status(404).json({
                success: true, message: "package data is not found"
            });

        res.status(200).json({
            success: true, message: "package data is found", packages
        })

    } catch (error) {
        return next(new httpError("route not found", 404)
        )
    }
};

// find by id

const getById = async (req, res, next) => {

    try {

        const { id } = req.params;

        const packages = await Packages.findById(id);

        if (!packages) {
            return next(new httpError("package data is not founld", 404))
        }

        res.status(200).json({
            success: true, message: "package data is found", packages
        })

    } catch (error) {
        next(new httpError(error.message, 500))
    }

}

// delete by id

const deletePackage = async (req, res, next) => {

    try {

        const id = req.params.id;

        console.log("ID:", id);

        const PackageDelete = await Packages.findById(id)

        if (!PackageDelete) {
            return res.status(404).json({ message: "no package found with is id" })
        }

        await cloudinary.uploader.destroy(PackageDelete.cloudinary_id)
        await PackageDelete.deleteOne()

        res.status(200).json({ success: true, message: "package delete successfully" })

    } catch (error) {
        next(new httpError(error.message))
    }

}



export default { addPackage, getAllPackage, getById, deletePackage };