import jwt from "jsonwebtoken";
import httpError from "./httpError.js";
import userModel from "../model/userModel.js";

const auth = async function (req, res, next) {

    try {

        const authHeader = req.header("Authorization");

        if (!authHeader) {
            return next(new httpError("auth header is required"));
        }

        const token = authHeader.replace("Bearer ", "")

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findOne({
            _id: decoded._id,
            "tokens.token": token,
        });

        if (!user) {
            return next(new httpError("Authentication failed", 401));
        }

        req.user = user;

        req.token = token;  
        next()

    } catch (error) {
        next(new httpError(error.message, 401));
    }
};

export default auth;