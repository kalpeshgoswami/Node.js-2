import jwt from "jsonwebtoken";
import httpError from "./httpError.js";
import userModel from "../model/userModel.js";

const auth = async function (req, res, next) {

    try {

        const authHeader = req.header("Authorization");
        console.log("Authheader : ", authHeader);

        if (!authHeader) {
            return next(new httpError("auth header is required"));
        }

        const token = authHeader.replace("Bearer ", "")
        console.log("Token : ", token);

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded : ", decoded);

        const user = await userModel.findOne({
            _id: decoded._id,
            "tokens.token": token,
        });
        console.log("user : ", user);

        if (!user) {
            return next(new httpError("Authentication failed", 401));
        }

        req.user = user;
        console.log("Req.user : ", req.user);

        req.token = token;
        console.log("Req.token : ", req.token)
        next()

    } catch (error) {
        next(new httpError(error.message, 401));
    }
};

export default auth;