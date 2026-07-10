import jwt from "jsonwebtoken";
import User from "../model/model.js";
import HttpError from "./httpError.js";

const auth = async (req, res, next) => {
    try {

        const authHeader = req.header("Authorization");

        if (!authHeader) {
            return next(new HttpError("Authorization header is required", 400));
        }

        const token = authHeader.replace("Bearer ", "");

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({
            _id: decode._id,
            "tokens.token": token
        });

        if (!user) {
            return next(new HttpError("Unauthorized access", 401));
        }

        req.user = user;
        req.token = token;

        next();

    } catch (error) {
        return next(new HttpError(error.message, 401));
    }
};

export default auth;