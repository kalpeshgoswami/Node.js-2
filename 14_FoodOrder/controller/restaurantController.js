import restaurantModel from "../model/restaurantModel.js";
import HttpError from "../middleware/httpError.js";

// Add Restaurant
const add = async (req, res, next) => {
    try {
        const {
            restaurantName,
            rating,
            description,
            address,
            state,
            city,
            phone,
            openingTime,
            closingTime
        } = req.body;

        const newRestaurant = await restaurantModel.create({
            restaurantName,
            description,
            address,
            state,
            city,
            phone,
            rating,
            openingTime,
            closingTime,
            restaurantImage: req.file?.path || null,
            cloudinary_id: req.file?.filename || null,
            owner: req.user._id
        });

        res.status(201).json({
            success: true,
            message: "Restaurant added successfully",
            newRestaurant
        });

    } catch (error) {
        next(new HttpError(error.message));
    }
};

export default { add };